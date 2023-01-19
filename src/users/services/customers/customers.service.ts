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

  async findAll() {
    return await this.customerRepo.find();
  }

  async findOne(id: string) {
    const customer = await this.customerRepo.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  async create(payload: CreateCustomerDto) {
    const newCustomer = await this.customerRepo.create(payload);
    return this.customerRepo.save(newCustomer);
  }

  async update(id: string, payload: UpdateCustomerDto) {
    const customerFound = await this.customerRepo.findOneBy({ id });
    this.customerRepo.merge(customerFound, payload);
    return this.customerRepo.save(customerFound);
  }

  async remove(id: number) {
    return await this.customerRepo.delete(id);
  }
}
