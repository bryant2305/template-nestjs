import { Controller, Get, Post, Body } from '@nestjs/common';
import { RegisterFoodService } from './register-food.service';
import { CreateRegisterFoodDto } from './dto/create-register-food.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Register food')
@Controller('register-food')
export class RegisterFoodController {
  constructor(private readonly registerFoodService: RegisterFoodService) {}

  @Post()
  create(@Body() createRegisterFoodDto: CreateRegisterFoodDto) {
    return this.registerFoodService.create(createRegisterFoodDto);
  }

  @Get()
  findAll() {
    return this.registerFoodService.findAll();
  }
}
