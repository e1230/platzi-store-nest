import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('costumers')
export class CostumersController {
  @Get()
  getAll(@Query() params: any): {} {
    const {limit = 100, offset = 0, brand} = params;
    return {
      message:  `costumers: limit: ${limit} offset: ${offset}`
    };
  }
  @Get(':id')
  getOne(@Param('id') id:string): {} {
    return {
      message: `costumer ${id}`
    };
  }
  @Post()
  create(@Body() payload: any): {}{
    return {message: 'creacion costumers', payload};
  }
}
