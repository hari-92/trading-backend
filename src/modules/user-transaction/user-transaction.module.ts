import { Module } from '@nestjs/common';
import { UserTransactionService } from './user-transaction.service';
import { UserTransactionController } from './user-transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserTransaction,
  UserTransactionSchema,
} from './schemas/user-transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserTransaction.name, schema: UserTransactionSchema },
    ]),
  ],
  controllers: [UserTransactionController],
  providers: [UserTransactionService],
})
export class UserTransactionModule {}
