import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/products.entity';
import {
  CreateProductDto,
  UpdateProductDto,
} from '../../products/dto/products.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandsService } from './brands/brands.service';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private brandService: BrandsService,
  ) {}

  async findAll() {
    return await this.productRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['brand'],
    });
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
    if (payload.brandID) {
      const brand = await this.brandService.findOne(payload.brandID);
      newProduct.brand = brand;
    }
    return this.productRepo.save(newProduct);
  }
  async update(id: number, payload: UpdateProductDto) {
    const productFound = await this.productRepo.findOneBy({ id });
    if (payload.brandID) {
      const brand = await this.brandService.findOne(payload.brandID);
      productFound.brand = brand;
    }
    this.productRepo.merge(productFound, payload);
    return this.productRepo.save(productFound);
  }

  async delete(id: number) {
    return await this.productRepo.delete(id);
  }
}
