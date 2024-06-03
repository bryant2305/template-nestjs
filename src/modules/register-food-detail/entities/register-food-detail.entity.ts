import { RegisterFood } from 'src/modules/register-food/entities/register-food.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RegisterFoodDetail {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  food: string;

  @Column('float')
  calories: number;

  @Column('float')
  proteins: number;

  @Column('float')
  carbs: number;

  @Column('float')
  fats: number;

  @ManyToOne(
    () => RegisterFood,
    (registerFood) => registerFood.registerFoodDetail,
  )
  registerFood: RegisterFood;
}
