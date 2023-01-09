import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { User } from 'src/users/entities/users.entity';
import { CreateUserDto, UpdateUserDto } from '../../users/dto/users.dto';
import { Order } from '../entities/orders/order.entity';
import { ProductsService } from '../../products/services/products.service';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private productService: ProductsService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
    }
    return user;
  }
  async getOrdersByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      product: await this.productService.findAll(),
    };
  }

  async create(payload: CreateUserDto) {
    const newUser = await this.userRepo.create(payload);
    return this.userRepo.save(newUser);
  }
  async update(id: number, payload: UpdateUserDto) {
    const userFound = await this.userRepo.findOneBy({ id });
    this.userRepo.merge(userFound, payload);
    return this.userRepo.save(userFound);
  }

  async remove(id: number) {
    return await this.userRepo.delete(id);
  }
}
