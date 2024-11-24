import { Injectable } from '@nestjs/common';
import { CreateCandleDto } from './dto/create-candle.dto';
import { UpdateCandleDto } from './dto/update-candle.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Candle, CandleDocument } from './schemas/candle.schema';
import { Model } from 'mongoose';
import { Trade } from '../trade/schemas/trade.schema';

@Injectable()
export class CandleService {
  constructor(
    @InjectModel(Candle.name)
    private readonly candleRepository: Model<CandleDocument>,
  ) {}

  async updateCandlesticks(trade: Trade) {
    const intervals = ['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w'];
    for (const interval of intervals) {
      await this.updateCandlestick(trade, interval);
    }
  }

  private async updateCandlestick(trade: Trade, interval: string) {
    const timestamp = this.getIntervalTimestamp(trade.timestamp, interval);
    const query = {
      trading_pair_id: trade.trading_pair_id,
      interval,
      timestamp,
    };
    const candlestick = await this.candleRepository.findOne(query);

    const now = new Date();
    const updateCandleDto: Partial<Candle> = {
      high: trade.price,
      low: trade.price,
      close: trade.price,
      interval,
      updated_at: now,
    };

    if (!candlestick) {
      updateCandleDto.trading_pair_id = trade.trading_pair_id;
      updateCandleDto.open = trade.price;
      updateCandleDto.volume = trade.amount;
      updateCandleDto.created_at = now;
    } else {
      updateCandleDto.high = Math.max(candlestick.high, trade.price);
      updateCandleDto.low = Math.min(candlestick.low, trade.price);
      updateCandleDto.volume = (candlestick.volume || 0) + trade.amount;
    }
    await this.candleRepository.findOneAndUpdate(
      query,
      {
        $set: updateCandleDto,
      },
      {
        upsert: true,
        new: true,
      },
    );
  }

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

  private getIntervalTimestamp(date: Date, interval: string): Date {
    const timestamp = new Date(date);
    switch (interval) {
      case '1m':
        timestamp.setSeconds(0, 0);
        break;
      case '5m':
        timestamp.setMinutes(Math.floor(timestamp.getMinutes() / 5) * 5, 0, 0);
        break;
      case '15m':
        timestamp.setMinutes(
          Math.floor(timestamp.getMinutes() / 15) * 15,
          0,
          0,
        );
        break;
      case '30m':
        timestamp.setMinutes(
          Math.floor(timestamp.getMinutes() / 30) * 30,
          0,
          0,
        );
        break;
      case '1h':
        timestamp.setMinutes(0, 0, 0);
        break;
      case '4h':
        timestamp.setHours(Math.floor(timestamp.getHours() / 4) * 4, 0, 0, 0);
        break;
      case '1d':
        timestamp.setHours(0, 0, 0, 0);
        break;
      case '1w':
        const day = timestamp.getDay();
        timestamp.setDate(timestamp.getDate() - day + (day === 0 ? -6 : 1));
        timestamp.setHours(0, 0, 0, 0);
        break;
    }
    return timestamp;
  }
}
