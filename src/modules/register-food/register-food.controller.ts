import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { RegisterFoodService } from './register-food.service';
import { CreateRegisterFoodDto } from './dto/create-register-food.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt-auth-guard';
import { RegisterFoodDetailService } from '../register-food-detail/register-food-detail.service';
import { RegisterFood } from './entities/register-food.entity';

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
  @ApiOperation({ summary: 'Create a new meal with foods' })
  @ApiResponse({
    status: 201,
    description: 'The meal has been successfully created.',
    type: RegisterFood,
  })
  @ApiBody({ type: CreateRegisterFoodDto })
  async create(
    @Body() createRegisterFoodDto: CreateRegisterFoodDto,
  ): Promise<RegisterFood> {
    return this.registerFoodService.create(createRegisterFoodDto);
  }
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: number) {
    return this.registerFoodService.findByRegisterFoodId(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(':id/calculate-macros')
  async calculateMacros(@Param('id') id: number) {
    // this.logger.log(`Calculating macros for RegisterFood ID: ${id}`);
    return this.registerFoodService.calculateMacros(id);
  }
}
