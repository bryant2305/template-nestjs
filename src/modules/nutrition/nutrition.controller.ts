import { Controller, Get, Query } from '@nestjs/common';
import { NutritionWrapper } from './nutrition.wrapper';
import { ApiTags } from '@nestjs/swagger';

@Controller('nutrition')
@ApiTags('wrapper')
export class NutritionController {
  constructor(private readonly nutritionWrapper: NutritionWrapper) {}

  @Get('details')
  async getNutritionDetails(@Query('food') food: string) {
    return await this.nutritionWrapper.getNutritionDetails(food);
  }
}
