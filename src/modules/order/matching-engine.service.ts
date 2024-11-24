import { Injectable } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { ORDER_CREATED_EVENT, OrderCreatedEvent } from '../../events';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class MatchingEngineService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async processOrder(order: Order) {
    this.eventEmitter.emit(
      ORDER_CREATED_EVENT,
      new OrderCreatedEvent(order.id),
    );
    return `This action process a #${order.id} matchingEngine`;
  }
}
