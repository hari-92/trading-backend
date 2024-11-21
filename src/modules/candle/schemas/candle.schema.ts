import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CandleDocument = Candle & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Candle {
  @Prop()
  trading_pair_id: number;

  @Prop()
  interval: string; // 1m | 1h | 1d

  @Prop()
  open: number;

  @Prop()
  high: number;

  @Prop()
  low: number;

  @Prop()
  close: number;

  @Prop()
  volume: number;

  @Prop()
  timestamp: Date;
}

export const CandleSchema = SchemaFactory.createForClass(Candle);
