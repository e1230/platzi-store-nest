import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../../entities/categories/categories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../../dto/categories/categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async findAll() {
    return await this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async create(payload: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create(payload);
    return await this.categoryRepo.save(newCategory);
  }

  async update(id: number, payload: UpdateCategoryDto) {
    const categoryFound = await this.categoryRepo.findOneBy({ id });
    this.categoryRepo.merge(categoryFound, payload);
    return this.categoryRepo.save(categoryFound);
  }

  remove(id: number) {
    return this.categoryRepo.delete(id);
  }
}
