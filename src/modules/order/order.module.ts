import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Wallet } from '../wallet/entities/wallet.entity';
import { MatchingEngineService } from './matching-engine.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Wallet])],
  controllers: [OrderController],
  providers: [OrderService, MatchingEngineService],
})
export class OrderModule {}
