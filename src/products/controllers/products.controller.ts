/* eslint-disable @typescript-eslint/ban-types */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { ProductsService } from '../services/products.service';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../dto/products.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  @ApiOperation({ summary: 'product`s List' })
  getProducts(@Query() params: FilterProductsDto) {
    // return {
    //   message: `products: limit: ${limit} offset: ${offset} brand: ${brand}`,
    // };
    return this.productsService.findAll(params);
  }
  @Get('filter')
  // eslint-disable-next-line @typescript-eslint/ban-types
  getProductFilter(): {} {
    return {
      message: `soy un filter`,
    };
  }
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('id', ParseIntPipe) id: number): {} {
    return this.productsService.findOne(id);
  }
  @Post()
  create(@Body() payload: CreateProductDto) {
    this.productsService.create(payload);
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ): {} {
    return this.productsService.update(id, payload);
  }
  @Put(':id/category/:categoryId')
  addCategoryToProduct(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) idCategory: number,
  ): {} {
    return this.productsService.addCategoryToProduct(id, idCategory);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): {} {
    return this.productsService.delete(id);
  }
  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) idCategory: number,
  ): {} {
    return this.productsService.removeCategoryByProdutId(id, idCategory);
  }
}
