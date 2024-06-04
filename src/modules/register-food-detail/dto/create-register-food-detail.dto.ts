import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRegisterFoodDetailDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  food: string;

  @IsNotEmpty()
  @ApiProperty({ example: '100' })
  cuantity: number;
}
