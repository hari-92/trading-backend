import { MongooseModuleOptions } from '@nestjs/mongoose';

export const mongoConfig: MongooseModuleOptions = {
  uri: process.env.MONGO_URI,
};
