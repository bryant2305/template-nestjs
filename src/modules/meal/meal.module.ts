import { Module } from '@nestjs/common';
import { NutritionModule } from '../nutrition/nutrition.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';
import { MealsController } from './meal.controller';
import { MealsService } from './meal.service';

@Module({
  imports: [TypeOrmModule.forFeature([Meal]), NutritionModule],
  controllers: [MealsController],
  providers: [MealsService],
})
export class MealModule {}
