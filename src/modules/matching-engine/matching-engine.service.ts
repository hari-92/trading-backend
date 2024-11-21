import { Injectable } from '@nestjs/common';
import { CreateMatchingEngineDto } from './dto/create-matching-engine.dto';
import { UpdateMatchingEngineDto } from './dto/update-matching-engine.dto';

@Injectable()
export class MatchingEngineService {
  create(createMatchingEngineDto: CreateMatchingEngineDto) {
    return 'This action adds a new matchingEngine';
  }

  findAll() {
    return `This action returns all matchingEngine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} matchingEngine`;
  }

  update(id: number, updateMatchingEngineDto: UpdateMatchingEngineDto) {
    return `This action updates a #${id} matchingEngine`;
  }

  remove(id: number) {
    return `This action removes a #${id} matchingEngine`;
  }
}
