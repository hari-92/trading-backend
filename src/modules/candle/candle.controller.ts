import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CandleService } from './candle.service';
import { CreateCandleDto } from './dto/create-candle.dto';
import { UpdateCandleDto } from './dto/update-candle.dto';

@Controller('candle')
export class CandleController {
  constructor(private readonly candleService: CandleService) {}

  @Post()
  create(@Body() createCandleDto: CreateCandleDto) {
    return this.candleService.create(createCandleDto);
  }

  @Get()
  findAll() {
    return this.candleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCandleDto: UpdateCandleDto) {
    return this.candleService.update(+id, updateCandleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candleService.remove(+id);
  }
}
