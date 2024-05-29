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

  async findByRegisterFoodId(registerFoodId: number) {
    return this.registerFoodDetailRepository.find({
      where: { registerFood: { id: registerFoodId } },
      relations: ['aliment'], // Incluir la relación con 'aliment'
      select: {
        id: true,
        cantidad_gramos: true,
        aliment: {
          id: true,
          name: true, // Seleccionar el campo 'name' del alimento
        },
      },
    });
  }
}
