import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Profile } from './profile.entity';
import { RegisterFood } from 'src/modules/register-food/entities/register-food.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToOne(() => Profile, { cascade: true, eager: true })
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => RegisterFood, (registerFood) => registerFood.user)
  registerFood: RegisterFood[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  delete_at: Date;
}
