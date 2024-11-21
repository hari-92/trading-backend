import { Injectable } from '@nestjs/common';
import { CreateCandleDto } from './dto/create-candle.dto';
import { UpdateCandleDto } from './dto/update-candle.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Candle, CandleDocument } from './schemas/candle.schema';
import { Model } from 'mongoose';

@Injectable()
export class CandleService {
  constructor(
    @InjectModel(Candle.name)
    private readonly candleRepository: Model<CandleDocument>,
  ) {}

  create(createCandleDto: CreateCandleDto) {
    const now = new Date();
    return this.candleRepository.create({
      ...createCandleDto,
      createdAt: now,
      updatedAt: now,
    });
  }

  findAll() {
    return `This action returns all candle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} candle`;
  }

  update(id: number, updateCandleDto: UpdateCandleDto) {
    return `This action updates a #${id} candle`;
  }

  remove(id: number) {
    return `This action removes a #${id} candle`;
  }
}
