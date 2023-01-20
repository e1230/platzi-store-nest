import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/orders/order.entity';
import { Repository } from 'typeorm';
import { Product } from '../../products/entities/products.entity';
import { OrderProduct } from '../entities/order-product.entity';
import {
  CreateOrderProductDto,
  UpdateOrderProductDto,
} from '../dto/order-product.dto';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProduct)
    private orderProductRepo: Repository<OrderProduct>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}
  async create(payload: CreateOrderProductDto) {
    const order = await this.orderRepo.findOneBy({ id: payload.orderId });
    const product = await this.productRepo.findOneBy({ id: payload.productId });
    const item = new OrderProduct();
    item.order = order;
    item.product = product;
    item.quantity = payload.quantity;
    return this.orderProductRepo.save(item);
  }
  async update(id: number, payload: UpdateOrderProductDto) {
    const item = await this.orderProductRepo.findOneBy({ id });
    if (payload.orderId) {
      const order = await this.orderRepo.findOneBy({ id: payload.orderId });
      item.order = order;
    }
    if (payload.productId) {
      const product = await this.productRepo.findOneBy({
        id: payload.productId,
      });
      item.product = product;
    }
    if (payload.quantity) {
      item.quantity = payload.quantity;
    }
    return this.orderProductRepo.save(item);
  }
  async remove(id: number) {
    return await this.orderProductRepo.delete(id);
  }
}
