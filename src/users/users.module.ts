import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { CostumersController } from './controllers/costumers/costumers.controller';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers/customers.service';

@Module({
  controllers: [UsersController, CostumersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
