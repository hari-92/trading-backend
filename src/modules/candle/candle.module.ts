import { Module } from '@nestjs/common';
import { CandleService } from './candle.service';
import { CandleController } from './candle.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Candle, CandleSchema } from './schemas/candle.schema';
import { CandleCreatedListener } from './listeners/trade-created.listener';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Candle.name, schema: CandleSchema }]),
  ],
  controllers: [CandleController],
  providers: [CandleService, CandleCreatedListener],
})
export class CandleModule {}
