import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { User } from "../auth/user.entity";

@Entity({ name: "tasks" })
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus

  @ManyToOne(type => User, user => user.tasks, { eager: false })
  user: User;

  @Column()
  userId: number; // postgres don`t want to work without this column
}