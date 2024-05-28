import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { RegisterFoodDetailService } from './register-food-detail.service';
import { CreateRegisterFoodDetailDto } from './dto/create-register-food-detail.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt-auth-guard';

@Controller('register-food-detail')
@ApiTags('Register food detail')
export class RegisterFoodDetailController {
  constructor(
    private readonly registerFoodDetailService: RegisterFoodDetailService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  create(@Body() createRegisterFoodDetailDto: CreateRegisterFoodDetailDto) {
    return this.registerFoodDetailService.create(createRegisterFoodDetailDto);
  }
}
