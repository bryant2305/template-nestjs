import { Injectable } from '@nestjs/common';
import { CreateRegisterFoodDto } from './dto/create-register-food.dto';
import { UpdateRegisterFoodDto } from './dto/update-register-food.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterFood } from './entities/register-food.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegisterFoodService {
  constructor(
    @InjectRepository(RegisterFood)
    private readonly registerFoodRepository: Repository<RegisterFood>,
  ) {}
  create(createRegisterFoodDto: CreateRegisterFoodDto) {
    const registerFood = this.registerFoodRepository.create(
      createRegisterFoodDto,
    );
    return this.registerFoodRepository.save(registerFood);
  }

  findAll() {
    return `This action returns all registerFood`;
  }

  findOne(id: number) {
    return `This action returns a #${id} registerFood`;
  }

  update(id: number, updateRegisterFoodDto: UpdateRegisterFoodDto) {
    return `This action updates a #${id} registerFood`;
  }

  remove(id: number) {
    return `This action removes a #${id} registerFood`;
  }
}
