import { PartialType } from '@nestjs/mapped-types';
import { CreateTradingPairDto } from './create-trading-pair.dto';

export class UpdateTradingPairDto extends PartialType(CreateTradingPairDto) {}
