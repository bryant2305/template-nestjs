import { Injectable } from '@nestjs/common';
import { CreateAlimentDto } from './dto/create-aliment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Aliment } from './entities/aliment.entity';
import { Repository, Like } from 'typeorm';

@Injectable()
export class AlimentService {
  constructor(
    @InjectRepository(Aliment)
    private readonly alimentRepository: Repository<Aliment>,
  ) {}

  create(createAlimentDto: CreateAlimentDto) {
    return this.alimentRepository.save(createAlimentDto);
  }

  async findAll({
    page = 1,
    limit = 10,
    name,
  }: {
    page?: number;
    limit?: number;
    name?: string;
  }) {
    // Convert page and limit to numbers if they are not already
    page = Number(page);
    limit = Number(limit);

    const [result, total] = await this.alimentRepository.findAndCount({
      where: name ? { name: Like(`%${name}%`) } : {},
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: result,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    return this.alimentRepository.findOne({ where: { id } });
  }
}
