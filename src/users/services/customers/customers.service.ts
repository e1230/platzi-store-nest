import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../../entities/customers/customers.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from '../../dto/customers/customers.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.customerRepo.find();
  }

  findOne(id: number) {
    const customer = this.customerRepo.findBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  // create(data: CreateCustomerDto) {
  //   this.counterId = this.counterId + 1;
  //   const newCustomer = {
  //     id: this.counterId,
  //     ...data,
  //   };
  //   this.customers.push(newCustomer);
  //   return newCustomer;
  // }

  // update(id: number, changes: UpdateCustomerDto) {
  //   const customer = this.findOne(id);
  //   const index = this.customers.findIndex((item) => item.id === id);
  //   this.customers[index] = {
  //     ...customer,
  //     ...changes,
  //   };
  //   return this.customers[index];
  // }

  // remove(id: number) {
  //   const index = this.customers.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`Customer #${id} not found`);
  //   }
  //   this.customers.splice(index, 1);
  //   return true;
  // }
}
