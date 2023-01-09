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

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    const user = this.userRepo.findBy({ id });
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

  // create(payload: CreateUserDto) {
  //   this.counterId++;
  //   const newUser = {
  //     id: this.counterId,
  //     ...payload,
  //   };
  //   this.users.push(newUser);
  //   return newUser;
  // }
  // update(id: number, payload: UpdateUserDto) {
  //   const userFound = this.findOne(id);
  //   let message = '';
  //   if (userFound) {
  //     const index = this.users.findIndex((item) => item.id === id);
  //     this.users[index] = {
  //       ...userFound,
  //       ...payload,
  //     };
  //     message = 'User updated';
  //   } else {
  //     message = 'User not found';
  //   }
  //   return message;
  // }

  // remove(id: number) {
  //   const userFound = this.findOne(id);
  //   let message = '';
  //   if (userFound) {
  //     const index = this.users.findIndex((item) => item.id === id);
  //     this.users.splice(index);
  //     message = 'User deleted';
  //   } else {
  //     message = 'User not found';
  //   }
  //   return message;
  // }
}
