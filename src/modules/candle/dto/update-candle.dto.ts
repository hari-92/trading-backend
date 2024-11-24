import { PartialType } from '@nestjs/mapped-types';
import { CreateCandleDto } from './create-candle.dto';

export class UpdateCandleDto extends PartialType(CreateCandleDto) {
  updated_at: Date;
}
