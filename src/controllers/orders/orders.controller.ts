import { Body, Controller, Post, Get, Query, Param } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  getAll(@Query() params: any): {} {
    const {limit = 100, offset = 0, brand} = params;
    return {
      message:  `orders: limit: ${limit} offset: ${offset}`
    };
  }
  @Get(':id')
  getOne(@Param('id') id:string): {} {
    return {
      message: `order ${id}`
    };
  }
  @Post()
  create(@Body() payload: any): {}{
    return {message: 'creacion orders', payload};
  }
}
