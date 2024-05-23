import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  height: number;

  @Column()
  weight: number;

  @Column()
  health_goal: string;

  @Column()
  activity_level: string;
}
