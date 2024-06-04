import { Injectable } from '@nestjs/common';
import { CreateRegisterFoodDetailDto } from './dto/create-register-food-detail.dto';
import { RegisterFoodDetail } from './entities/register-food-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RegisterFoodDetailService {
  constructor(
    @InjectRepository(RegisterFoodDetail)
    private readonly registerFoodDetailRepository: Repository<RegisterFoodDetail>,
  ) {}

  async create(createRegisterFoodDetailDto: CreateRegisterFoodDetailDto) {
    return this.registerFoodDetailRepository.save(createRegisterFoodDetailDto);
  }
}
