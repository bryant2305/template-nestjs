import { Injectable } from '@nestjs/common';
import { CreateRegisterFoodDetailDto } from './dto/create-register-food-detail.dto';
import { UpdateRegisterFoodDetailDto } from './dto/update-register-food-detail.dto';
import { RegisterFoodDetail } from './entities/register-food-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RegisterFoodDetailService {
  constructor(
    @InjectRepository(RegisterFoodDetail)
    private readonly registerFoodRepository: Repository<RegisterFoodDetail>,
  ) {}
  create(createRegisterFoodDetailDto: CreateRegisterFoodDetailDto) {
    return this.registerFoodRepository.save(createRegisterFoodDetailDto);
  }

  findOne(id: number) {
    return this.registerFoodRepository.findOne({ where: { id } });
  }
}
