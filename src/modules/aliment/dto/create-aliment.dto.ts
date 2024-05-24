import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAlimentDto {
  @IsString()
  @ApiProperty({ example: 'Pechuga de pollo' })
  @IsNotEmpty()
  name: string;

  @IsString()
  @ApiProperty({ example: 'carnne de pollo?' })
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @ApiProperty({ example: '100' })
  @IsNotEmpty()
  calories_portion: number;

  @IsNumber()
  @ApiProperty({ example: '22' })
  @IsNotEmpty()
  protein_portion: number;

  @IsNumber()
  @ApiProperty({ example: '2' })
  @IsNotEmpty()
  carbos_portion: number;

  @IsNumber()
  @ApiProperty({ example: '12' })
  @IsNotEmpty()
  fats_portion: number;
}
