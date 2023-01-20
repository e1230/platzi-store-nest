import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/products.entity';
import {
  CreateProductDto,
  UpdateProductDto,
} from '../../products/dto/products.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BrandsService } from './brands/brands.service';
import { Category } from '../entities/categories/categories.entity';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
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
      relations: ['brand', 'categories'],
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
    if (payload.brandId) {
      const brand = await this.brandService.findOne(payload.brandId);
      newProduct.brand = brand;
    }
    if (payload.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        id: In(payload.categoriesIds),
      });
      newProduct.categories = categories;
    }
    return this.productRepo.save(newProduct);
  }
  async addCategoryToProduct(id: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['categories'],
    });
    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
    });
    product.categories.push(category);
    return this.productRepo.save(product);
  }
  async update(id: number, payload: UpdateProductDto) {
    const productFound = await this.productRepo.findOneBy({ id });
    if (payload.brandId) {
      const brand = await this.brandService.findOne(payload.brandId);
      productFound.brand = brand;
    }
    if (payload.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        id: In(payload.categoriesIds),
      });
      productFound.categories = categories;
    }
    this.productRepo.merge(productFound, payload);
    return this.productRepo.save(productFound);
  }
  async removeCategoryByProdutId(id: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['categories'],
    });
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );
    return this.productRepo.save(product);
  }

  async delete(id: number) {
    return await this.productRepo.delete(id);
  }
}
