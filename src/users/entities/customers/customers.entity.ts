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
@Entity({ name: 'customers' })
export class Customer {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', unique: true, name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', unique: true, name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar' })
  phone?: string;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;
  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
