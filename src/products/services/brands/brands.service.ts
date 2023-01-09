import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '../../entities/brands/brands.entity';
import { CreateBrandDto, UpdateBrandDto } from '../../dto/brands/brands.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  findAll() {
    return this.brandRepo.find();
  }

  findOne(id: number) {
    const product = this.brandRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return product;
  }

  // create(data: CreateBrandDto) {
  //   this.counterId = this.counterId + 1;
  //   const newBrand = {
  //     id: this.counterId,
  //     ...data,
  //   };
  //   this.brands.push(newBrand);
  //   return newBrand;
  // }

  // update(id: number, changes: UpdateBrandDto) {
  //   const brand = this.findOne(id);
  //   const index = this.brands.findIndex((item) => item.id === id);
  //   this.brands[index] = {
  //     ...brand,
  //     ...changes,
  //   };
  //   return this.brands[index];
  // }

  // remove(id: number) {
  //   const index = this.brands.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`Brand #${id} not found`);
  //   }
  //   this.brands.splice(index, 1);
  //   return true;
  // }
}
