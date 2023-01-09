import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/products.entity';
import {
  CreateProductDto,
  UpdateProductDto,
} from '../../products/dto/products.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async findAll() {
    return await this.productRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Producto con id: ${id} no encontrado`);
    }
    return product;
  }

  async create(payload: CreateProductDto) {
    // const newProduct = new Product();
    // newProduct.name = payload.name;
    // newProduct.description = payload.description;
    // newProduct.price = payload.price;
    // newProduct.stock = payload.stock;
    // newProduct.image = payload.image;
    const newProduct = await this.productRepo.create(payload);
    return this.productRepo.save(newProduct);
  }
  async update(id: number, payload: UpdateProductDto) {
    const productFound = await this.productRepo.findOneBy({ id });
    this.productRepo.merge(productFound, payload);
    return this.productRepo.save(productFound);
  }

  async delete(id: number) {
    return await this.productRepo.delete(id);
  }
}
