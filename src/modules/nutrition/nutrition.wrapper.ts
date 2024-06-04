import { Injectable, NotFoundException } from '@nestjs/common';
import { NutritionService } from './nutrition.service';

@Injectable()
export class NutritionWrapper {
  constructor(private readonly nutritionService: NutritionService) {}

  async getNutritionDetails(food: string) {
    const nutritionData = await this.nutritionService
      .getNutritionData(food)
      .toPromise();

    // Definir la porción de referencia en gramos (100 gramos en este caso)
    const referenceServingWeightGrams = 100;

    const foodDetails = nutritionData.foods.map((foodItem) => {
      // Calcular el factor de ajuste basado en la porción de referencia
      const adjustmentFactor =
        referenceServingWeightGrams / foodItem.serving_weight_grams;

      // Aplicar el factor de ajuste a los valores nutricionales
      const adjustedNutrition = {
        name: foodItem.food_name,
        calories: parseFloat(
          (foodItem.nf_calories * adjustmentFactor).toFixed(2),
        ),
        proteins: parseFloat(
          (foodItem.nf_protein * adjustmentFactor).toFixed(2),
        ),
        carbs: parseFloat(
          (foodItem.nf_total_carbohydrate * adjustmentFactor).toFixed(2),
        ),
        fats: parseFloat((foodItem.nf_total_fat * adjustmentFactor).toFixed(2)),
      };

      return adjustedNutrition;
    });

    return foodDetails;
  }
}
