import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { User } from 'src/users/entities/users.entity';
import { CreateUserDto, UpdateUserDto } from '../../users/dto/users.dto';
import { ProductsService } from '../../products/services/products.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomersService } from './customers/customers.service';

@Injectable()
export class UsersService {
  constructor(
    private productService: ProductsService,
    @InjectRepository(User) private userRepo: Repository<User>,
    private customerService: CustomersService,
  ) {}

  async findAll() {
    return await this.userRepo.find({
      relations: ['customer'],
    });
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['customer'],
    });
    if (!user) {
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
    }
    return user;
  }
  async getOrdersByUser(id: string) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      product: await this.productService.findAll(),
    };
  }

  async create(payload: CreateUserDto) {
    const newUser = await this.userRepo.create(payload);
    if (payload.customerId) {
      const customer = await this.customerService.findOne(payload.customerId);
      newUser.customer = customer;
    }
    return this.userRepo.save(newUser);
  }
  async update(id: string, payload: UpdateUserDto) {
    const userFound = await this.userRepo.findOneBy({ id });
    this.userRepo.merge(userFound, payload);
    return this.userRepo.save(userFound);
  }

  async remove(id: number) {
    return await this.userRepo.delete(id);
  }
}
