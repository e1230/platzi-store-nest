import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import {
  CreateUserDto,
  FilterUsersDto,
  UpdateUserDto,
} from 'src/users/dto/users.dto';
import { UsersService } from '../services/users.service';
import { ApiTags } from '@nestjs/swagger';
import { Query } from '@nestjs/common';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(@Query() params: FilterUsersDto) {
    return this.usersService.findAll(params);
  }
  @Get(':id')
  get(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.findOne(id);
  }
  @Get(':id/orders')
  getOrders(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.getOrdersByUser(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(+id);
  }
}
