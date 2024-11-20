import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../modules/user/entities/user.entity';
import { Token } from '../modules/token/entities/token.entity';
import { TradingPair } from '../modules/trading-pair/entities/trading-pair.entity';
import { Wallet } from '../modules/wallet/entities/wallet.entity';
import { Order } from '../modules/order/entities/order.entity';

export const mysqlConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [User, Token, TradingPair, Wallet, Order],
  synchronize: process.env.NODE_ENV !== 'production',
};
