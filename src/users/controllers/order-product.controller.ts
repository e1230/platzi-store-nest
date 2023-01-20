import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { OrderProductService } from '../services/order-product.service';
import {
  CreateOrderProductDto,
  UpdateOrderProductDto,
} from '../dto/order-product.dto';
import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';

@Controller('order-product')
export class OrderProductController {
  constructor(private orderProductService: OrderProductService) {}

  @Post()
  create(@Body() payload: CreateOrderProductDto) {
    return this.orderProductService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrderProductDto,
  ) {
    return this.orderProductService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderProductService.remove(+id);
  }
}
