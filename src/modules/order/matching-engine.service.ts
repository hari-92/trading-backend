import { Injectable } from '@nestjs/common';
import { Order } from './entities/order.entity';

@Injectable()
export class MatchingEngineService {
  async processOrder(order: Order) {
    return `This action process a #${order.id} matchingEngine`;
  }
}
