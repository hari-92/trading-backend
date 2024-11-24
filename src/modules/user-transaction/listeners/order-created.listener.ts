import { Injectable } from '@nestjs/common';
import { UserTransaction } from '../schemas/user-transaction.schema';
import { Repository } from 'typeorm';
import { OnEvent } from '@nestjs/event-emitter';
import { ORDER_CREATED_EVENT, OrderCreatedEvent } from '../../../events';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../order/entities/order.entity';
import { OrderType } from '../../order/enums/order.enum';
import { UserTransactionType } from '../enums/user-transaction.enum';
import { Model } from 'mongoose';

@Injectable()
export class UserTransactionCreationListener {
  constructor(
    @InjectModel(UserTransaction.name)
    private readonly userTransactionRepository: Model<UserTransaction>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  @OnEvent(ORDER_CREATED_EVENT)
  async handleOrderCreatedEvent(event: OrderCreatedEvent) {
    const { orderId } = event;
    console.log(`start handleOrderCreatedEvent with order_id ${orderId}`);
    const order = await this.orderRepository.findOneBy({ id: orderId });
    if (order.type === OrderType.MARKET) {
      const userTransaction = new this.userTransactionRepository({
        user_id: order.user_id,
        type: UserTransactionType.TRADE,
        amount: order.original_amount,
        token_id: orderId,
      });
      await userTransaction.save();
    }
  }
}
