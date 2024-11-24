import { Module } from '@nestjs/common';
import { UserTransactionService } from './user-transaction.service';
import { UserTransactionController } from './user-transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserTransaction,
  UserTransactionSchema,
} from './schemas/user-transaction.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../order/entities/order.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserTransaction.name, schema: UserTransactionSchema },
    ]),
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [UserTransactionController],
  providers: [UserTransactionService],
})
export class UserTransactionModule {}
