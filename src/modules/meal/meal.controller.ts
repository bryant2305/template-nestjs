// src/meals/meals.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateMealDto } from './dto/create-meal.dto';
import { Meal } from './entities/meal.entity';
import { MealsService } from './meal.service';

@Controller('meals')
@ApiTags('Meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new meal' })
  @ApiResponse({
    status: 201,
    description: 'The meal has been successfully created.',
    type: Meal,
  })
  @ApiBody({ type: CreateMealDto })
  async create(@Body() createMealDto: CreateMealDto): Promise<Meal> {
    return this.mealsService.create(createMealDto);
  }
}
