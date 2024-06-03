import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Aliment } from 'src/modules/aliment/entities/aliment.entity';
import { RegisterFood } from 'src/modules/register-food/entities/register-food.entity';

export class CreateRegisterFoodDetailDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  food: string;

  @IsNotEmpty()
  @ApiProperty({ example: '100' })
  cuantity: number;
}
