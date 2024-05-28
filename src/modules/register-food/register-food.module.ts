import { Module } from '@nestjs/common';
import { RegisterFoodService } from './register-food.service';
import { RegisterFoodController } from './register-food.controller';
import { RegisterFood } from './entities/register-food.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aliment } from '../aliment/entities/aliment.entity';
import { RegisterFoodDetail } from '../register-food-detail/entities/register-food-detail.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RegisterFood, Aliment, RegisterFoodDetail, User]),
  ],
  controllers: [RegisterFoodController],
  providers: [RegisterFoodService],
})
export class RegisterFoodModule {}
