import { Module } from '@nestjs/common';
import { RegisterFoodDetailService } from './register-food-detail.service';
import { RegisterFoodDetailController } from './register-food-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterFoodDetail } from './entities/register-food-detail.entity';
import { RegisterFood } from '../register-food/entities/register-food.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegisterFoodDetail, RegisterFood])],
  controllers: [RegisterFoodDetailController],
  providers: [RegisterFoodDetailService],
})
export class RegisterFoodDetailModule {}
