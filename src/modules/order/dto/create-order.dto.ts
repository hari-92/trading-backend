export class CreateOrderDto {
  user_id: number;
  trading_pair_id: number;
  type: string;
  side: string;
  amount: number;
  price: number;
  status: string;
}
