import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { WalletCreationListener } from './listeners/user-registered.listener';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet]), AuthModule],
  controllers: [WalletController],
  providers: [WalletService, WalletCreationListener],
})
export class WalletModule {}
