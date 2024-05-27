import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/modules/users/entities/user.entity';

export class CreateRegisterFoodDto {
  @IsNotEmpty()
  @ApiProperty({ example: '1' })
  user: User;
}
