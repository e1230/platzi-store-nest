import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers/customers.controller';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers/customers.service';
import { ProductsModule } from '../products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Customer } from './entities/customers/customers.entity';
import { Order } from './entities/orders/order.entity';
import { OrderProduct } from './entities/order-product.entity';
import { OrdersService } from './services/orders/orders.service';
import { OrdersController } from './controllers/orders/orders.controller';
import { OrderProductService } from './services/order-product.service';
import { OrderProductController } from './controllers/order-product.controller';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Customer, Order, OrderProduct]),
  ],
  controllers: [
    UsersController,
    CustomersController,
    OrdersController,
    OrderProductController,
  ],
  providers: [
    UsersService,
    CustomersService,
    OrdersService,
    OrderProductService,
  ],
})
export class UsersModule {}
