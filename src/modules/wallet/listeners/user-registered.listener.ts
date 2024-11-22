import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { USER_REGISTERED_EVENT, UserRegisteredEvent } from '../../../events';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from '../entities/wallet.entity';
import { Repository } from 'typeorm';
import { CreateWalletDto } from '../dto/create-wallet.dto';

@Injectable()
export class WalletCreationListener {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}

  @OnEvent(USER_REGISTERED_EVENT)
  handleUserRegisteredEvent(event: UserRegisteredEvent) {
    console.log(
      `start handleUserRegisteredEvent with user_id: ${event.userID}`,
    );
    const createWalletDto: CreateWalletDto = new CreateWalletDto();
    createWalletDto.user_id = event.userID;
    createWalletDto.token_id = 1;
    const result = this.walletRepository.save(createWalletDto);
    console.log(result);
  }
}
