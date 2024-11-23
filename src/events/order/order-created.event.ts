export class OrderCreatedEvent {
  constructor(public readonly orderId: number) {}
}

export const ORDER_CREATED_EVENT: string = 'order.created';
