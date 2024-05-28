import { PartialType } from '@nestjs/swagger';
import { CreateRegisterFoodDetailDto } from './create-register-food-detail.dto';

export class UpdateRegisterFoodDetailDto extends PartialType(CreateRegisterFoodDetailDto) {}
