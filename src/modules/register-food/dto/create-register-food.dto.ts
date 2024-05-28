import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { AlimentoDto } from 'src/modules/aliment/dto/aliment.dto';
import { User } from 'src/modules/users/entities/user.entity';

export class CreateRegisterFoodDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 1 })
  id_usuario: number;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2024-05-24T12:34:56Z' })
  fecha_registro: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AlimentoDto)
  @ApiProperty({ type: [AlimentoDto] })
  alimentos: AlimentoDto[];
}
