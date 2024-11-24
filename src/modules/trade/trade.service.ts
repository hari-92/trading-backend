import { Injectable } from '@nestjs/common';
import { CreateTradeDto } from './dto/create-trade.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trade, TradeDocument } from './schemas/trade.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  TRADE_CREATED_EVENT,
  TradeCreatedEvent,
} from '../../events/trade/trade-created.event';

@Injectable()
export class TradeService {
  constructor(
    @InjectModel(Trade.name)
    private readonly tradeRepository: Model<TradeDocument>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(createTradeDto: CreateTradeDto) {
    const trade = await this.tradeRepository.create({
      ...createTradeDto,
      timestamp: Date.now(),
    });
    this.eventEmitter.emit(TRADE_CREATED_EVENT, new TradeCreatedEvent(trade));
  }

  findAll() {
    return `This action returns all trade`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trade`;
  }
}
