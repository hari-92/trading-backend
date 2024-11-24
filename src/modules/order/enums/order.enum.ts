export enum OrderSide {
  BUY = 1,
  SELL,
}

export enum OrderType {
  LIMIT = 1,
  MARKET,
}

export enum OrderStatus {
  OPEN = 1,
  FILLED,
  PARTIALLY_FILLED,
  CANCELLED,
}
