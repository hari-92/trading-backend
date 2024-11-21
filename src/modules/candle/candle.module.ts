import { Module } from '@nestjs/common';
import { CandleService } from './candle.service';
import { CandleController } from './candle.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Candle, CandleSchema } from './schemas/candle.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Candle.name, schema: CandleSchema }]),
  ],
  controllers: [CandleController],
  providers: [CandleService],
})
export class CandleModule {}
