import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get()
  getAll(@Query() params: any): {} {
    const {limit = 100, offset = 0, brand} = params;
    return {
      message: `brands: limit: ${limit} offset: ${offset}`
    };
  }
  @Get(':id')
  getOne(@Param('id') id:string): {} {
    return {
      message: `brand ${id}`
    };
  }
  @Post()
  create(@Body() payload: any): {}{
    return {message: 'creacion brands', payload};
  }
}
