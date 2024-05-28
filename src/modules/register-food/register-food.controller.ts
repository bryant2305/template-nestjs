import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { RegisterFoodService } from './register-food.service';
import { CreateRegisterFoodDto } from './dto/create-register-food.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RegisterFood } from './entities/register-food.entity';
import { plainToClass } from 'class-transformer';
import { JwtGuard } from 'src/auth/jwt-auth-guard';

@ApiTags('Register food')
@Controller('register-food')
export class RegisterFoodController {
  constructor(private readonly registerFoodService: RegisterFoodService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async create(@Body() createRegisterFoodDto: CreateRegisterFoodDto) {
    return this.registerFoodService.create(createRegisterFoodDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  findAll() {
    return this.registerFoodService.findAll();
  }
}
