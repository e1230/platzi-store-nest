import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from '../../services/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  getProducts(@Query() params: any): {} {
    const { limit = 100, offset = 0, brand } = params;
    // return {
    //   message: `products: limit: ${limit} offset: ${offset} brand: ${brand}`,
    // };
    return this.productsService.findAll();
  }
  @Get('filter')
  getProductFilter(): {} {
    return {
      message: `soy un filter`,
    };
  }
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('id', ParseIntPipe) id: number): {} {
    // return {
    //   message: `product ${id}`,
    // };
    return this.productsService.findOne(id);
  }
  @Post()
  create(@Body() payload: any) {
    // return { message: 'accion de crear', payload };
    this.productsService.create(payload);
  }
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: any): {} {
    return this.productsService.update(id, payload);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): {} {
    return this.productsService.delete(id);
  }
}
