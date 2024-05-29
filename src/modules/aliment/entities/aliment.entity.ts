import { RegisterFoodDetail } from 'src/modules/register-food-detail/entities/register-food-detail.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Aliment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  calories_100g: number;

  @Column()
  protein_100g: number;

  @Column()
  carbos_100g: number;

  @Column()
  fats_100g: number;

  @OneToMany(
    () => RegisterFoodDetail,
    (registerFoodDetail) => registerFoodDetail.aliment,
  )
  registerFoodDetail: RegisterFoodDetail[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  delete_at: Date;
}
