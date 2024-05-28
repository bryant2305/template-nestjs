import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AlimentService } from './aliment.service';
import { CreateAlimentDto } from './dto/create-aliment.dto';
import { ApiTags, ApiQuery, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt-auth-guard';

@Controller('aliment')
@ApiTags('Aliment')
export class AlimentController {
  constructor(private readonly alimentService: AlimentService) {}

  @ApiOperation({ summary: 'create a aliment' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createAlimentDto: CreateAlimentDto) {
    return this.alimentService.create(createAlimentDto);
  }

  @ApiOperation({ summary: 'get all aliments' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
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

  @ApiOperation({ summary: 'find a aliment' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.alimentService.findOne(id);
  }
}
