import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlimentService } from './aliment.service';
import { CreateAlimentDto } from './dto/create-aliment.dto';
import { UpdateAlimentDto } from './dto/update-aliment.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('aliment')
@ApiTags('Aliment')
export class AlimentController {
  constructor(private readonly alimentService: AlimentService) {}

  @Post()
  create(@Body() createAlimentDto: CreateAlimentDto) {
    return this.alimentService.create(createAlimentDto);
  }

  @Get()
  findAll() {
    return this.alimentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alimentService.findOne(id);
  }
}
