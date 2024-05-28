import { Exclude } from 'class-transformer';
import { Aliment } from 'src/modules/aliment/entities/aliment.entity';
import { RegisterFood } from 'src/modules/register-food/entities/register-food.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RegisterFoodDetail {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(
    () => RegisterFood,
    (registerFood) => registerFood.registerFoodDetail,
  )
  @Exclude({ toPlainOnly: true })
  registerFood: RegisterFood;

  @ManyToOne(() => Aliment, (aliment) => aliment.registerFoodDetail)
  aliment: Aliment;

  @Column()
  cantidad: number;
}
