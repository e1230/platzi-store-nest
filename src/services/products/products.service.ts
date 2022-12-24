import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../../entities/products/products.entity';
@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Producto 1',
      description:
        'Ullamco id irure exercitvation aute culpa non ullamco duis aute proident ut nulla aliquip aute.',
      price: 122,
      stock: 0,
      image: '',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Producto con id: ${id} no encontrado`);
    }
    return product;
  }

  create(payload: any) {
    this.counterId++;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  update(id: number, payload: any) {
    const productFound = this.findOne(id);
    let message = '';
    if (productFound) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = {
        ...productFound,
        ...payload,
      };
      message = 'Product updated';
    } else {
      message = 'Product not found';
    }
    return message;
  }

  delete(id: number) {
    const productFound = this.findOne(id);
    let message = '';
    if (productFound) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products.splice(index);
      message = 'product deleted';
    } else {
      message = 'product not found';
    }
    return message;
  }
}
