import { Injectable } from '@nestjs/common';
import { Product } from '../../entities/products/products.entity';
@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Producto 1',
      description:
        'Ullamco id irure exercitation aute culpa non ullamco duis aute proident ut nulla aliquip aute.',
      price: 122,
      stock: 0,
      image: '',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((item) => item.id === id);
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
    if (productFound != undefined) {
      this.products[productFound.id - 1] = {
        id: id,
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
    if (productFound != undefined) {
      this.products.splice(productFound.id - 1, 1);
      message = 'product deleted';
    } else {
      message = 'product not found';
    }
    return message;
  }
}
