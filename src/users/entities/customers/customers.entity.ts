import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users.entity';
import { Order } from '../orders/order.entity';
@Entity()
export class Customer {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', unique: true })
  firstName: string;

  @Column({ type: 'varchar', unique: true })
  lastName: string;

  @Column({ type: 'varchar' })
  phone?: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
