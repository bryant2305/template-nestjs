import { PartialType } from '@nestjs/swagger';
import { CreateRegisterFoodDto } from './create-register-food.dto';

export class UpdateRegisterFoodDto extends PartialType(CreateRegisterFoodDto) {}
