import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterFood } from './entities/register-food.entity';
import { CreateRegisterFoodDto } from './dto/create-register-food.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { Aliment } from 'src/modules/aliment/entities/aliment.entity';
import { RegisterFoodDetail } from '../register-food-detail/entities/register-food-detail.entity';

@Injectable()
export class RegisterFoodService {
  constructor(
    @InjectRepository(RegisterFood)
    private readonly registerFoodRepository: Repository<RegisterFood>,
    @InjectRepository(RegisterFoodDetail)
    private readonly registerFoodDetailRepository: Repository<RegisterFoodDetail>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Aliment)
    private readonly alimentRepository: Repository<Aliment>,
  ) {}

  async create(createRegisterFoodDto: CreateRegisterFoodDto) {
    const { id_usuario, fecha_registro, alimentos } = createRegisterFoodDto;

    // Encontrar el usuario
    const user = await this.userRepository.findOne({
      where: { id: id_usuario },
    });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Crear el registro de comida
    const registerFood = new RegisterFood();
    registerFood.user = user;
    registerFood.created_at = new Date(fecha_registro);

    // Crear los detalles de alimentos
    const registerFoodDetails = await Promise.all(
      alimentos.map(async (alimentoDto) => {
        const aliment = await this.alimentRepository.findOne({
          where: { id: alimentoDto.id_alimento },
        });
        if (!aliment) {
          throw new Error(
            `Alimento con ID ${alimentoDto.id_alimento} no encontrado`,
          );
        }

        const registerFoodDetail = new RegisterFoodDetail();
        registerFoodDetail.aliment = aliment;
        registerFoodDetail.cantidad = alimentoDto.cantidad;
        registerFoodDetail.registerFood = registerFood;
        return registerFoodDetail;
      }),
    );

    // Guardar el registro de comida junto con los detalles
    registerFood.registerFoodDetail = registerFoodDetails;
    await this.registerFoodRepository.save(registerFood);
    await this.registerFoodDetailRepository.save(registerFoodDetails);

    return {
      id_usuario,
      fecha_registro,
      alimentos: registerFoodDetails.map((detail) => ({
        id_alimento: detail.aliment.id,
        cantidad: detail.cantidad,
      })),
    };
  }

  async findAll() {
    return this.registerFoodRepository.find();
  }
}
