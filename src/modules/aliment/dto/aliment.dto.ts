import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class AlimentoDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 1 })
  id_alimento: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 100 })
  cantidad_gramos: number;
}
