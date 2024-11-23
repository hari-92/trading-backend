import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserTransactionType } from '../enums/user-transaction.enum';
import { Document } from 'mongoose';

@Schema({
  collection: 'user_transactions',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class UserTransaction extends Document {
  @Prop()
  user_id: number;

  @Prop()
  token_id: number;

  @Prop({
    type: 'number',
    enum: UserTransactionType,
    description: 'DEPOSIT = 1, WITHDRAWAL = 2, TRADE = 3',
  })
  type: UserTransactionType; // deposit | withdrawal | trade

  @Prop()
  amount: number;
}

export const UserTransactionSchema =
  SchemaFactory.createForClass(UserTransaction);
