import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/entities/users.entity';
import { CreateUserDto, UpdateUserDto } from '../../users/dto/users.dto';
import { Order } from '../entities/orders/order.entity';
import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(private productService: ProductsService) {}
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'embeltrans@correo.udistrital.edu.co',
      password: '850518',
      role: 'dev',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
    }
    return user;
  }
  getOrdersByUser(id: number): Order {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      product: this.productService.findAll(),
    };
  }

  create(payload: CreateUserDto) {
    this.counterId++;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }
  update(id: number, payload: UpdateUserDto) {
    const userFound = this.findOne(id);
    let message = '';
    if (userFound) {
      const index = this.users.findIndex((item) => item.id === id);
      this.users[index] = {
        ...userFound,
        ...payload,
      };
      message = 'User updated';
    } else {
      message = 'User not found';
    }
    return message;
  }

  remove(id: number) {
    const userFound = this.findOne(id);
    let message = '';
    if (userFound) {
      const index = this.users.findIndex((item) => item.id === id);
      this.users.splice(index);
      message = 'User deleted';
    } else {
      message = 'User not found';
    }
    return message;
  }
}
