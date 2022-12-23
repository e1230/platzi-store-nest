import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get('categories/:id/products/:productId')
  getCategory(@Param('id') id:string, @Param('productId') productoId:string): string {
    return `category ${id} and product ${productoId}`;
  }
}
