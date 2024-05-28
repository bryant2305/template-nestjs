import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Aliment } from 'src/modules/aliment/entities/aliment.entity';
import { RegisterFood } from 'src/modules/register-food/entities/register-food.entity';

export class CreateRegisterFoodDetailDto {
  @IsNotEmpty()
  @ApiProperty({ example: '1' })
  register_food: RegisterFood;

  @IsNotEmpty()
  @ApiProperty({ example: '1' })
  aliment: Aliment;

  @IsNotEmpty()
  @ApiProperty({ example: '100' })
  cuantity: string;
}
