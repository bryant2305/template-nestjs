// src/nutrition/nutrition.wrapper.ts

import { Injectable } from '@nestjs/common';
import { NutritionService } from './nutrition.service';

@Injectable()
export class NutritionWrapper {
  constructor(private readonly nutritionService: NutritionService) {}

  async getNutritionDetails(food: string) {
    const nutritionData = await this.nutritionService
      .getNutritionData(food)
      .toPromise();
    const foodDetails = nutritionData.foods.map((foodItem) => ({
      name: foodItem.food_name,
      calories: foodItem.nf_calories,
      proteins: foodItem.nf_protein,
      carbs: foodItem.nf_total_carbohydrate,
      fats: foodItem.nf_total_fat,
    }));
    return foodDetails;
  }
}
