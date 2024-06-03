// src/meals/entities/meal.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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
}
