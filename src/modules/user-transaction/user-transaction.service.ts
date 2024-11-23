import { Injectable } from '@nestjs/common';
import { CreateUserTransactionDto } from './dto/create-user-transaction.dto';
import { UpdateUserTransactionDto } from './dto/update-user-transaction.dto';
import { UserTransaction } from './schemas/user-transaction.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserTransactionService {
  constructor(
    @InjectModel(UserTransaction.name)
    private readonly userTransactionRepository: Model<UserTransaction>,
  ) {}

  create(createUserTransactionDto: CreateUserTransactionDto) {
    const now = new Date();
    return this.userTransactionRepository.create({
      ...createUserTransactionDto,
      createdAt: now,
      updatedAt: now,
    });
  }

  findAll() {
    return `This action returns all userTransaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userTransaction`;
  }

  update(id: number, updateUserTransactionDto: UpdateUserTransactionDto) {
    return `This action updates a #${id} userTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} userTransaction`;
  }
}
