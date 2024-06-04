import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { NutritionWrapper } from './nutrition.wrapper';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt-auth-guard';

@Controller('nutrition')
@ApiTags('wrapper')
export class NutritionController {
  constructor(private readonly nutritionWrapper: NutritionWrapper) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('details')
  async getNutritionDetails(@Query('food') food: string) {
    return await this.nutritionWrapper.getNutritionDetails(food);
  }
}
