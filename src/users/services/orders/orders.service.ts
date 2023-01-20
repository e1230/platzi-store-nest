import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../entities/orders/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../../dto/orders/orders.dto';
import { Customer } from '../../entities/customers/customers.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}
  async findAll() {
    return await this.orderRepo.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['products', 'products.product'],
    });
    if (!order) {
      throw new NotFoundException(`order #${id} not found`);
    }
    return order;
  }

  async create(payload: CreateOrderDto) {
    const order = new Order();
    if (payload.customerId) {
      const customer = await this.customerRepo.findOneBy({
        id: payload.customerId,
      });
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  async update(id: number, payload: UpdateOrderDto) {
    const order = await this.orderRepo.findOneBy({ id });
    if (payload.customerId) {
      const customer = await this.customerRepo.findOneBy({
        id: payload.customerId,
      });
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  async remove(id: number) {
    return await this.orderRepo.delete(id);
  }
}
