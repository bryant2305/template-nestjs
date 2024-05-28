import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { RegisterFoodService } from './register-food.service';
import { CreateRegisterFoodDto } from './dto/create-register-food.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt-auth-guard';
import { RegisterFoodDetailService } from '../register-food-detail/register-food-detail.service';

@ApiTags('Register food')
@Controller('register-food')
export class RegisterFoodController {
  constructor(
    private readonly registerFoodService: RegisterFoodService,
    private readonly registerFoodDetailService: RegisterFoodDetailService,
  ) {}

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
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: number) {
    return this.registerFoodDetailService.findByRegisterFoodId(id);
  }

  @Get(':id/macros')
  calculateMacros(@Param('id') id: number) {
    return this.registerFoodService.calculateMacros(id);
  }
}
