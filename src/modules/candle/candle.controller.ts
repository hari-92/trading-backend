import { Controller, Get, Param } from '@nestjs/common';
import { CandleService } from './candle.service';

@Controller('candle')
export class CandleController {
  constructor(private readonly candleService: CandleService) {}

  @Get()
  findAll() {
    return this.candleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candleService.findOne(+id);
  }
}
