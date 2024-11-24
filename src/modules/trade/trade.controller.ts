import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TradeService } from './trade.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('trade')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Get()
  findAll() {
    return this.tradeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tradeService.findOne(+id);
  }
}
