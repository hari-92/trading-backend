import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TradingPairService } from './trading-pair.service';
import { CreateTradingPairDto } from './dto/create-trading-pair.dto';
import { UpdateTradingPairDto } from './dto/update-trading-pair.dto';

@Controller('trading-pair')
export class TradingPairController {
  constructor(private readonly tradingPairService: TradingPairService) {}

  @Post()
  create(@Body() createTradingPairDto: CreateTradingPairDto) {
    return this.tradingPairService.create(createTradingPairDto);
  }

  @Get()
  findAll() {
    return this.tradingPairService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tradingPairService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTradingPairDto: UpdateTradingPairDto,
  ) {
    return this.tradingPairService.update(+id, updateTradingPairDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tradingPairService.remove(+id);
  }
}
