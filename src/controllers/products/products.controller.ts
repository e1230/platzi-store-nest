import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(@Query() params: any): {} {
    const { limit = 100, offset = 0, brand } = params;
    return {
      message: `products: limit: ${limit} offset: ${offset} brand: ${brand}`,
    };
  }
  @Get('filter')
  getProductFilter(): {} {
    return {
      message: `soy un filter`,
    };
  }
  @Get(':id')
  getProduct(@Param('id') id: string): {} {
    return {
      message: `product ${id}`,
    };
  }
  @Post()
  create(@Body() payload: any): {} {
    return { message: 'accion de crear', payload };
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any): {} {
    return {
      message: 'update',
      id,
      payload,
    };
  }
  @Delete(':id')
  delete(@Param('id') id: number): {} {
    return { id };
  }
}
