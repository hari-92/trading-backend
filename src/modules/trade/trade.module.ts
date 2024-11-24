import { Module } from '@nestjs/common';
import { TradeService } from './trade.service';
import { TradeController } from './trade.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Trade, TradeSchema } from './schemas/trade.schema';
import { TradeCreationListener } from './listeners/order-created.listener';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../order/entities/order.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trade.name, schema: TradeSchema }]),
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [TradeController],
  providers: [TradeService, TradeCreationListener],
})
export class TradeModule {}
