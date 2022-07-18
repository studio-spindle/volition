import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TaskStatus } from './task-status.enum';
import { UserEntity } from "../auth/user/user.entity";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(type => UserEntity, user => user.tasks, { eager: false })
  user: UserEntity;

  @Column()
  userId: number;
}
