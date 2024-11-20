import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlConfig } from './config/mysql.config';
import { mongoConfig } from './config/mongo.config';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { redisConfig } from './config/redis.config';
import { TokenModule } from './modules/token/token.module';
import { TradingPairModule } from './modules/trading-pair/trading-pair.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(mongoConfig.uri),
    TypeOrmModule.forRoot(mysqlConfig),
    CacheModule.registerAsync(redisConfig),
    AuthModule,
    UserModule,
    TokenModule,
    TradingPairModule,
    WalletModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
