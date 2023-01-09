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

  findAll() {
    return this.productRepo.find();
  }

  findOne(id: number) {
    const product = this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Producto con id: ${id} no encontrado`);
    }
    return product;
  }

  // create(payload: CreateProductDto) {
  //   this.counterId++;
  //   const newProduct = {
  //     id: this.counterId,
  //     ...payload,
  //   };
  //   this.products.push(newProduct);
  //   return newProduct;
  // }
  // update(id: number, payload: UpdateProductDto) {
  //   const productFound = this.findOne(id);
  //   let message = '';
  //   if (productFound) {
  //     const index = this.products.findIndex((item) => item.id === id);
  //     this.products[index] = {
  //       ...productFound,
  //       ...payload,
  //     };
  //     message = 'Product updated';
  //   } else {
  //     message = 'Product not found';
  //   }
  //   return message;
  // }

  // delete(id: number) {
  //   const productFound = this.findOne(id);
  //   let message = '';
  //   if (productFound) {
  //     const index = this.products.findIndex((item) => item.id === id);
  //     this.products.splice(index);
  //     message = 'product deleted';
  //   } else {
  //     message = 'product not found';
  //   }
  //   return message;
  // }
}
