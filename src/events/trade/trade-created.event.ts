import { Trade } from '../../modules/trade/schemas/trade.schema';

export class TradeCreatedEvent {
  constructor(public readonly trade: Trade) {}
}

export const TRADE_CREATED_EVENT = 'trade.created';
