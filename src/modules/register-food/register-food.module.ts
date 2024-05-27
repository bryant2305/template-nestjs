import { Module } from '@nestjs/common';
import { RegisterFoodService } from './register-food.service';
import { RegisterFoodController } from './register-food.controller';
import { RegisterFood } from './entities/register-food.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RegisterFood])],
  controllers: [RegisterFoodController],
  providers: [RegisterFoodService],
})
export class RegisterFoodModule {}
