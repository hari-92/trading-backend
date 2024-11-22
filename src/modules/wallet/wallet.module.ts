import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { WalletCreationListener } from './listeners/user-registered.listener';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet]), AuthModule, JwtModule],
  controllers: [WalletController],
  providers: [WalletService, WalletCreationListener],
})
export class WalletModule {}
