import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(@Query() params: any): string {
    const {limit = 100, offset = 0, brand} = params;
    return `products: limit: ${limit} offset: ${offset} brand: ${brand}`;
  }
  @Get('filter')
  getProductFilter(): string {
    return `soy un filter`;
  }
  @Get(':id')
  getProduct(@Param('id') id:string): string {
    return `product ${id}`;
  }
}
