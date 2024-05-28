import { Controller, Get, Post, Body } from '@nestjs/common';
import { RegisterFoodService } from './register-food.service';
import { CreateRegisterFoodDto } from './dto/create-register-food.dto';
import { ApiTags } from '@nestjs/swagger';
import { RegisterFood } from './entities/register-food.entity';
import { plainToClass } from 'class-transformer';

@ApiTags('Register food')
@Controller('register-food')
export class RegisterFoodController {
  constructor(private readonly registerFoodService: RegisterFoodService) {}

  @Post()
  async create(@Body() createRegisterFoodDto: CreateRegisterFoodDto) {
    return this.registerFoodService.create(createRegisterFoodDto);
  }

  @Get()
  findAll() {
    return this.registerFoodService.findAll();
  }
}
