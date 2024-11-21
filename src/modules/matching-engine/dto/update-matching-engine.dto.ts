import { PartialType } from '@nestjs/mapped-types';
import { CreateMatchingEngineDto } from './create-matching-engine.dto';

export class UpdateMatchingEngineDto extends PartialType(CreateMatchingEngineDto) {}
