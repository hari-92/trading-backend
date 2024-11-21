import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserTransactionDocument = UserTransaction & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class UserTransaction {
  @Prop()
  user_id: number;

  @Prop()
  type: string; // deposit | withdrawal | trade

  @Prop()
  token_id: number;

  @Prop()
  amount: number;
}

export const UserTransactionSchema =
  SchemaFactory.createForClass(UserTransaction);
