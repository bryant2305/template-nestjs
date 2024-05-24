import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Aliment {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  calories_portion: number;

  @Column()
  protein_portion: number;

  @Column()
  carbos_portion: number;

  @Column()
  fats_portion: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  delete_at: Date;
}
