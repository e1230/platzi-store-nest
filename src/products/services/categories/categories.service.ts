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

  findAll() {
    return this.categoryRepo.find();
  }

  findOne(id: number) {
    const category = this.categoryRepo.findBy({ id });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  // create(data: CreateCategoryDto) {
  //   this.counterId = this.counterId + 1;
  //   const newCategory = {
  //     id: this.counterId,
  //     ...data,
  //   };
  //   this.categories.push(newCategory);
  //   return newCategory;
  // }

  // update(id: number, changes: UpdateCategoryDto) {
  //   const category = this.findOne(id);
  //   const index = this.categories.findIndex((item) => item.id === id);
  //   this.categories[index] = {
  //     ...category,
  //     ...changes,
  //   };
  //   return this.categories[index];
  // }

  // remove(id: number) {
  //   const index = this.categories.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`Category #${id} not found`);
  //   }
  //   this.categories.splice(index, 1);
  //   return true;
  // }
}
