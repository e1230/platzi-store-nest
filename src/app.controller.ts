import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('products/filter')
  getProductFilter(): string {
    return `soy un filter`;
  }
  @Get('products/:id')
  getProduct(@Param('id') id:string): string {
    return `product ${id}`;
  }

  @Get('products')
  getProducts(@Query() params: any): string {
    const {limit = 100, offset = 0, brand} = params;
    return `products: limit: ${limit} offset: ${offset} brand: ${brand}`;
  }
  @Get('categories/:id/products/:productId')
  getCategory(@Param('id') id:string, @Param('productId') productoId:string): string {
    return `category ${id} and product ${productoId}`;
  }
}
