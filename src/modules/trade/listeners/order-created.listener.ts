import { Injectable } from '@nestjs/common';
import { Trade } from '../schemas/trade.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OnEvent } from '@nestjs/event-emitter';
import { ORDER_CREATED_EVENT, OrderCreatedEvent } from '../../../events';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../order/entities/order.entity';
import { Brackets, Repository } from 'typeorm';
import {
  OrderSide,
  OrderStatus,
  OrderType,
} from '../../order/enums/order.enum';
import { TradeService } from '../trade.service';
import { CreateTradeDto } from '../dto/create-trade.dto';

@Injectable()
export class TradeCreationListener {
  constructor(
    @InjectModel(Trade.name)
    private readonly tradeRepository: Model<Trade>,
    private readonly tradeService: TradeService,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  @OnEvent(ORDER_CREATED_EVENT)
  async handleOrderCreatedEvent(event: OrderCreatedEvent) {
    const { orderId } = event;
    console.log(`start handleOrderCreatedEvent with order_id ${orderId}`);
    const order = await this.orderRepository.findOneBy({ id: orderId });

    let orderRemainingAmount = order.original_amount;
    while (orderRemainingAmount > 0) {
      console.log(
        `start getNextOppositeOrder with orderRemainingAmount ${orderRemainingAmount}`,
      );
      const oppositeOrder = await this.getNextOppositeOrder(order);
      if (!oppositeOrder) break;

      const matchedAmount = Math.min(
        orderRemainingAmount,
        oppositeOrder.original_amount - order.executed_amount,
      );

      const price =
        order.type === OrderType.LIMIT ? order.price : oppositeOrder.price;

      await this.createTrades(order, oppositeOrder, matchedAmount, price);

      order.executed_amount += matchedAmount;
      orderRemainingAmount -= matchedAmount;
      oppositeOrder.executed_amount += matchedAmount;

      await Promise.all([
        this.updateOrderStatus(order),
        this.updateOrderStatus(oppositeOrder),
      ]);

      await this.orderRepository.save([order, oppositeOrder]);
    }
  }

  private async getNextOppositeOrder(order: Order) {
    return await this.orderRepository
      .createQueryBuilder('order')
      .where('trading_pair_id = :tradingPairId', {
        tradingPairId: order.trading_pair_id,
      })
      .andWhere('order.type IN (:...types)', {
        types: [OrderType.MARKET, OrderType.LIMIT],
      })
      .andWhere('order.side = :side', {
        side: order.side == OrderSide.BUY ? OrderSide.SELL : OrderSide.BUY,
      })
      .andWhere('order.original_amount - order.executed_amount > 0')
      .andWhere('order.status = :status', { status: OrderStatus.OPEN })
      .andWhere(
        new Brackets((qb) => {
          qb.where('order.type = :limitType AND order.price IS NULL', {
            limitType: OrderType.LIMIT,
          }).orWhere('order.type = :marketType AND order.price = :price', {
            marketType: OrderType.MARKET,
            price: order.price,
          });
        }),
      )
      .orderBy('order.created_at', 'ASC')
      .getOne();
  }

  private async createTrades(
    order1: Order,
    order2: Order,
    amount: number,
    price: number,
  ) {
    const trade = new CreateTradeDto();
    trade.trading_pair_id = order1.id;
    trade.price = price;
    trade.amount = amount;

    await Promise.all([
      this.tradeService.create({ ...trade, order_id: order1.id }),
      this.tradeService.create({ ...trade, order_id: order2.id }),
    ]);
  }

  private async updateOrderStatus(order: Order) {
    if (order.original_amount - order.executed_amount <= 0) {
      order.status = OrderStatus.FILLED;
      return;
    }
    order.status = OrderStatus.PARTIALLY_FILLED;
  }
}
