import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderSide, OrderStatus, OrderType } from '../enums/order.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  trading_pair_id: number;

  @Column({
    type: 'enum',
    enum: OrderType,
    nullable: false,
    comment: 'LIMIT = 1,MARKET = 2',
  })
  type: OrderType;

  @Column({
    type: 'enum',
    enum: OrderSide,
    nullable: false,
    comment: 'BUY = 1, SELL = 2',
  })
  side: OrderSide;

  @Column()
  original_amount: number;

  @Column({ default: 0 })
  executed_amount: number;

  @Column({ nullable: true })
  price: number; //null for market orders

  @Column({
    type: 'enum',
    enum: OrderStatus,
    nullable: false,
    comment: 'OPEN = 0, FILLED = 1,PARTIALLY_FILLED = 2, CANCELLED = 3',
  })
  status: OrderStatus;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
