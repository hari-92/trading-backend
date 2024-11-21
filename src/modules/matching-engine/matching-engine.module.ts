import { Module } from '@nestjs/common';
import { MatchingEngineService } from './matching-engine.service';
import { MatchingEngineController } from './matching-engine.controller';

@Module({
  controllers: [MatchingEngineController],
  providers: [MatchingEngineService],
})
export class MatchingEngineModule {}
