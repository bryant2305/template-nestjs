import { RegisterFoodDetail } from 'src/modules/register-food-detail/entities/register-food-detail.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RegisterFood {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.registerFood)
  user: User;

  @OneToMany(
    () => RegisterFoodDetail,
    (registerFoodDetail) => registerFoodDetail.registerFood,
    { cascade: true },
  )
  registerFoodDetail: RegisterFoodDetail[];

  @CreateDateColumn()
  created_at: Date;
}
