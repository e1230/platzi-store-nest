import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { CostumersController } from './controllers/costumers/costumers.controller';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers/customers.service';
import { ProductsModule } from '../products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Customer } from './entities/customers/customers.entity';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([User, Customer])],
  controllers: [UsersController, CostumersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
