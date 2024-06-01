import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { NutritionService } from './nutrition.service';
import { NutritionController } from './nutrition.controller';
import { NutritionWrapper } from './nutrition.wrapper';
import { Nutrition } from './entities/nutrition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nutrition]), HttpModule, ConfigModule],
  controllers: [NutritionController],
  providers: [NutritionService, NutritionWrapper],
  exports: [NutritionWrapper],
})
export class NutritionModule {}
