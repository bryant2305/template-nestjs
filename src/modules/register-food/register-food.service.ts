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
      foodDetail.cuantity = food.cuantity;
      foodDetail.calories = nutritionDetails.calories;
      foodDetail.proteins = nutritionDetails.proteins;
      foodDetail.carbs = nutritionDetails.carbs;
      foodDetail.fats = nutritionDetails.fats;

      registerFood.registerFoodDetail.push(foodDetail);
    }

    return this.registerFoodRepository.save(registerFood);
  }

  async calculateMacros(registerFoodId: number) {
    const registerFood = await this.registerFoodRepository.findOne({
      where: { id: registerFoodId },
      relations: ['registerFoodDetail'],
    });

    if (!registerFood) {
      throw new Error('Registro de comida no encontrado');
    }

    let totalCalories = 0;
    let totalProteins = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    for (const foodDetail of registerFood.registerFoodDetail) {
      const nutritionDetailsArray =
        await this.nutritionWrapper.getNutritionDetails(foodDetail.food);
      const nutritionDetails = nutritionDetailsArray[0];
      const cantidad = foodDetail.cuantity;

      // Round totalCalories using Math.round()
      totalCalories += Math.round((nutritionDetails.calories * cantidad) / 100);
      totalProteins += Math.round((nutritionDetails.proteins * cantidad) / 100);
      totalCarbs += Math.round((nutritionDetails.carbs * cantidad) / 100);
      totalFats += Math.round((nutritionDetails.fats * cantidad) / 100);
    }

    return {
      message: 'Your dish macros:',
      totalCalories,
      totalProteins,
      totalCarbs,
      totalFats,
    };
  }
}
