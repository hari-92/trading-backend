export class CreateCandleDto {
  trading_pair_id: number;
  interval: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  timestamp: Date;
  created_at: Date;
}
