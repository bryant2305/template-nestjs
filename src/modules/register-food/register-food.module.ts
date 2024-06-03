import { Module } from '@nestjs/common';
import { RegisterFoodService } from './register-food.service';
import { RegisterFoodController } from './register-food.controller';
import { RegisterFood } from './entities/register-food.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aliment } from '../aliment/entities/aliment.entity';
import { RegisterFoodDetail } from '../register-food-detail/entities/register-food-detail.entity';
import { User } from '../users/entities/user.entity';
import { RegisterFoodDetailService } from '../register-food-detail/register-food-detail.service';
import { NutritionModule } from '../nutrition/nutrition.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RegisterFood, Aliment, RegisterFoodDetail, User]),
    NutritionModule,
  ],
  controllers: [RegisterFoodController],
  providers: [RegisterFoodService, RegisterFoodDetailService],
})
export class RegisterFoodModule {}
