import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateRegisterFoodDetailDto } from 'src/modules/register-food-detail/dto/create-register-food-detail.dto';
import { RegisterFoodDetail } from 'src/modules/register-food-detail/entities/register-food-detail.entity';

export class CreateRegisterFoodDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 1 })
  id_usuario: number;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2024-05-24T12:34:56Z' })
  fecha_registro: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: [CreateRegisterFoodDetailDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRegisterFoodDetailDto)
  foods: CreateRegisterFoodDetailDto[];
}
