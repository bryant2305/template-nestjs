// src/meals/meals.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meal } from './entities/meal.entity';
import { CreateMealDto } from './dto/create-meal.dto';
import { NutritionWrapper } from '../nutrition/nutrition.wrapper';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal)
    private readonly mealRepository: Repository<Meal>,
    private readonly nutritionWrapper: NutritionWrapper,
  ) {}

  async create(createMealDto: CreateMealDto): Promise<Meal> {
    const nutritionDetails = await this.nutritionWrapper.getNutritionDetails(
      createMealDto.food,
    );

    if (nutritionDetails.length === 0) {
      throw new Error(
        'Nutritional information not found for the specified food',
      );
    }

    const nutrition = nutritionDetails[0];

    const meal = this.mealRepository.create({
      name: createMealDto.name,
      food: createMealDto.food,
      calories: nutrition.calories,
      proteins: nutrition.proteins,
      carbs: nutrition.carbs,
      fats: nutrition.fats,
    });

    return this.mealRepository.save(meal);
  }
}
