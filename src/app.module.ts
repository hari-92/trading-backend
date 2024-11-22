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
import { MatchingEngineModule } from './modules/matching-engine/matching-engine.module';
import { TradeModule } from './modules/trade/trade.module';
import { CandleModule } from './modules/candle/candle.module';
import { UserTransactionModule } from './modules/user-transaction/user-transaction.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(mongoConfig.uri),
    TypeOrmModule.forRoot(mysqlConfig),
    CacheModule.registerAsync(redisConfig),
    EventEmitterModule.forRoot(),
    JwtModule.registerAsync(jwtConfig),
    AuthModule,
    UserModule,
    TokenModule,
    TradingPairModule,
    WalletModule,
    OrderModule,
    MatchingEngineModule,
    TradeModule,
    CandleModule,
    UserTransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
