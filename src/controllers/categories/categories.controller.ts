import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get(':id/products/:productId')
  getCategory(@Param('id') id:string, @Param('productId') productoId:string): string {
    return `category ${id} and product ${productoId}`;
  }
  @Get()
  getAll(@Query() params: any): {} {
    const {limit = 100, offset = 0, brand} = params;
    return {
      message:  `categories: limit: ${limit} offset: ${offset}`
    };
  }
  @Get(':id')
  getOne(@Param('id') id:string): {} {
    return {
      message: `category ${id}`
    };
  }
  @Post()
  create(@Body() payload: any): {}{
    return {message: 'creacion categories', payload};
  }
}
