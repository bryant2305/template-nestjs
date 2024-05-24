import { PartialType } from '@nestjs/swagger';
import { CreateAlimentDto } from './create-aliment.dto';

export class UpdateAlimentDto extends PartialType(CreateAlimentDto) {}
