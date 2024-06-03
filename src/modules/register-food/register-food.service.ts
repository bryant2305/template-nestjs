import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterFood } from './entities/register-food.entity';
import { CreateRegisterFoodDto } from './dto/create-register-food.dto';
import { RegisterFoodDetail } from '../register-food-detail/entities/register-food-detail.entity';
import { NutritionWrapper } from '../nutrition/nutrition.wrapper';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RegisterFoodService {
  constructor(
    @InjectRepository(RegisterFood)
    private readonly registerFoodRepository: Repository<RegisterFood>,
    @InjectRepository(RegisterFoodDetail)
    private readonly registerFoodDetailRepository: Repository<RegisterFoodDetail>,
    private readonly nutritionWrapper: NutritionWrapper,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createRegisterFoodDto: CreateRegisterFoodDto) {
    const user = await this.userRepository.findOne({
      where: { id: createRegisterFoodDto.id_usuario },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const registerFood = new RegisterFood();
    registerFood.user = user;
    registerFood.registerFoodDetail = [];

    for (const food of createRegisterFoodDto.foods) {
      const nutritionDetailsArray =
        await this.nutritionWrapper.getNutritionDetails(food.food);

      const nutritionDetails = nutritionDetailsArray[0];
      const foodDetail = new RegisterFoodDetail();
      foodDetail.food = food.food;
      foodDetail.calories = nutritionDetails.calories;
      foodDetail.proteins = nutritionDetails.proteins;
      foodDetail.carbs = nutritionDetails.carbs;
      foodDetail.fats = nutritionDetails.fats;

      registerFood.registerFoodDetail.push(foodDetail);
    }

    return this.registerFoodRepository.save(registerFood);
  }
}
