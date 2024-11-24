import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  TRADE_CREATED_EVENT,
  TradeCreatedEvent,
} from '../../../events/trade/trade-created.event';
import { CandleService } from '../candle.service';

@Injectable()
export class CandleCreatedListener {
  constructor(private readonly candleService: CandleService) {}

  @OnEvent(TRADE_CREATED_EVENT)
  async handleTradeCreatedEvent(event: TradeCreatedEvent) {
    const { trade } = event;
    console.log(`start handleTradeCreatedEvent with order_id`, trade);
    return this.candleService.updateCandlesticks(trade);
  }
}
