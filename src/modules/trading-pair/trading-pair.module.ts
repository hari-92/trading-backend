import { Module } from '@nestjs/common';
import { TradingPairService } from './trading-pair.service';
import { TradingPairController } from './trading-pair.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradingPair } from './entities/trading-pair.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TradingPair])],
  controllers: [TradingPairController],
  providers: [TradingPairService],
})
export class TradingPairModule {}
