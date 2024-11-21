import { PartialType } from '@nestjs/mapped-types';
import { CreateUserTransactionDto } from './create-user-transaction.dto';

export class UpdateUserTransactionDto extends PartialType(CreateUserTransactionDto) {}
