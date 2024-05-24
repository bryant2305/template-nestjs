import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { AlimentService } from './aliment.service';
import { CreateAlimentDto } from './dto/create-aliment.dto';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@Controller('aliment')
@ApiTags('Aliment')
export class AlimentController {
  constructor(private readonly alimentService: AlimentService) {}

  @Post()
  create(@Body() createAlimentDto: CreateAlimentDto) {
    return this.alimentService.create(createAlimentDto);
  }

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    description: 'Filter by name',
  })
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('name') name?: string,
  ) {
    // Convert page and limit to numbers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    return this.alimentService.findAll({
      page: pageNumber,
      limit: limitNumber,
      name,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alimentService.findOne(id);
  }
}
