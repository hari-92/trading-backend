import { Injectable } from '@nestjs/common';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trade, TradeDocument } from './schemas/trade.schema';

@Injectable()
export class TradeService {
  constructor(
    @InjectModel(Trade.name)
    private readonly tradeRepository: Model<TradeDocument>,
  ) {}

  create(createTradeDto: CreateTradeDto) {
    return this.tradeRepository.create({
      ...createTradeDto,
      timestamp: Date.now(),
    });
  }

  findAll() {
    return `This action returns all trade`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trade`;
  }

  update(id: number, updateTradeDto: UpdateTradeDto) {
    return `This action updates a #${id} trade`;
  }

  remove(id: number) {
    return `This action removes a #${id} trade`;
  }
}
