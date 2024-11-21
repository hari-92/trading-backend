import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TradeDocument = Trade & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Trade {
  @Prop()
  order_id: number;

  @Prop()
  trading_pair_id: number;

  @Prop()
  price: number;

  @Prop()
  amount: number;

  @Prop()
  timestamp: Date;
}

export const TradeSchema = SchemaFactory.createForClass(Trade);
