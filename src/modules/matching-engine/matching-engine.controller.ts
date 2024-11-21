import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MatchingEngineService } from './matching-engine.service';
import { CreateMatchingEngineDto } from './dto/create-matching-engine.dto';
import { UpdateMatchingEngineDto } from './dto/update-matching-engine.dto';

@Controller('matching-engine')
export class MatchingEngineController {
  constructor(private readonly matchingEngineService: MatchingEngineService) {}

  @Post()
  create(@Body() createMatchingEngineDto: CreateMatchingEngineDto) {
    return this.matchingEngineService.create(createMatchingEngineDto);
  }

  @Get()
  findAll() {
    return this.matchingEngineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchingEngineService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMatchingEngineDto: UpdateMatchingEngineDto) {
    return this.matchingEngineService.update(+id, updateMatchingEngineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matchingEngineService.remove(+id);
  }
}
