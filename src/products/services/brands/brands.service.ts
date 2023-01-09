import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '../../entities/brands/brands.entity';
import { CreateBrandDto, UpdateBrandDto } from '../../dto/brands/brands.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  async findAll() {
    return await this.brandRepo.find();
  }

  async findOne(id: number) {
    const product = await this.brandRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return product;
  }

  async create(payload: CreateBrandDto) {
    const newBrand = await this.brandRepo.create(payload);
    return this.brandRepo.save(newBrand);
  }

  async update(id: number, payload: UpdateBrandDto) {
    const brandFound = await this.brandRepo.findOneBy({ id });
    await this.brandRepo.merge(brandFound, payload);
    return this.brandRepo.save(brandFound);
  }

  async remove(id: number) {
    return await this.brandRepo.delete(id);
  }
}
