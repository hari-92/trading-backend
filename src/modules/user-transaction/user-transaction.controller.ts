import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserTransactionService } from './user-transaction.service';
import { CreateUserTransactionDto } from './dto/create-user-transaction.dto';
import { UpdateUserTransactionDto } from './dto/update-user-transaction.dto';

@Controller('user-transaction')
export class UserTransactionController {
  constructor(private readonly userTransactionService: UserTransactionService) {}

  @Post()
  create(@Body() createUserTransactionDto: CreateUserTransactionDto) {
    return this.userTransactionService.create(createUserTransactionDto);
  }

  @Get()
  findAll() {
    return this.userTransactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTransactionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserTransactionDto: UpdateUserTransactionDto) {
    return this.userTransactionService.update(+id, updateUserTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTransactionService.remove(+id);
  }
}
