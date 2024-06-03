import { Injectable } from '@nestjs/common';
import { CreateRegisterFoodDetailDto } from './dto/create-register-food-detail.dto';
import { RegisterFoodDetail } from './entities/register-food-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterFood } from '../register-food/entities/register-food.entity';

@Injectable()
export class RegisterFoodDetailService {
  constructor(
    @InjectRepository(RegisterFoodDetail)
    private readonly registerFoodDetailRepository: Repository<RegisterFoodDetail>,
    @InjectRepository(RegisterFood)
    private readonly registerFoodRepository: Repository<RegisterFood>,
  ) {}

  async create(createRegisterFoodDetailDto: CreateRegisterFoodDetailDto) {
    return this.registerFoodDetailRepository.save(createRegisterFoodDetailDto);
  }
}
