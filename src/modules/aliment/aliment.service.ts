import { Injectable } from '@nestjs/common';
import { CreateAlimentDto } from './dto/create-aliment.dto';
import { UpdateAlimentDto } from './dto/update-aliment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Aliment } from './entities/aliment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlimentService {
  constructor(
    @InjectRepository(Aliment)
    private readonly alimetRepository: Repository<Aliment>,
  ) {}
  create(createAlimentDto: CreateAlimentDto) {
    return this.alimetRepository.save(createAlimentDto);
  }

  findAll() {
    return this.alimetRepository.find();
  }

  findOne(id: string) {
    return this.alimetRepository.findOne({ where: { id } });
  }
}
