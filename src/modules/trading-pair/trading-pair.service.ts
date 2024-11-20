import { Injectable } from '@nestjs/common';
import { CreateTradingPairDto } from './dto/create-trading-pair.dto';
import { UpdateTradingPairDto } from './dto/update-trading-pair.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradingPair } from './entities/trading-pair.entity';

@Injectable()
export class TradingPairService {
  constructor(
    @InjectRepository(TradingPair)
    private readonly tradingPairRepository: Repository<TradingPair>,
  ) {}

  create(createTradingPairDto: CreateTradingPairDto) {
    return this.tradingPairRepository.save(createTradingPairDto);
  }

  findAll() {
    return `This action returns all tradingPair`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tradingPair`;
  }

  update(id: number, updateTradingPairDto: UpdateTradingPairDto) {
    return `This action updates a #${id} tradingPair`;
  }

  remove(id: number) {
    return `This action removes a #${id} tradingPair`;
  }
}
