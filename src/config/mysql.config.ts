import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../modules/user/entities/user.entity';

export const mysqlConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [User],
  synchronize: process.env.NODE_ENV !== 'production',
};
