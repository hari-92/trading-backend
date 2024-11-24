import { OrderSide, OrderType } from '../enums/order.enum';

export class CreateOrderDto {
  user_id: number;
  trading_pair_id: number;
  type: OrderType;
  side: OrderSide;
  original_amount: number;
  price: number;
}
