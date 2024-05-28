import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RegisterFoodDetailService } from './register-food-detail.service';
import { CreateRegisterFoodDetailDto } from './dto/create-register-food-detail.dto';
import { UpdateRegisterFoodDetailDto } from './dto/update-register-food-detail.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('register-food-detail')
@ApiTags('Register food detail')
export class RegisterFoodDetailController {
  constructor(
    private readonly registerFoodDetailService: RegisterFoodDetailService,
  ) {}

  @Post()
  create(@Body() createRegisterFoodDetailDto: CreateRegisterFoodDetailDto) {
    return this.registerFoodDetailService.create(createRegisterFoodDetailDto);
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.registerFoodDetailService.findOne(id);
  }
}
