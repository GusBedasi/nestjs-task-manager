import { BaseEntity, Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from './task-status.enum';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Generated()
  id: number;
  
  @Column()
  title: string;
  
  @Column()
  description: string;
  
  @Column()
  status: TaskStatus;
}
