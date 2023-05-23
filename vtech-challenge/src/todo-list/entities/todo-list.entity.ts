import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TodoList {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_todo_list_id' })
  id: number;

  @Index({ unique: true })
  @Column()
  todo: string;

  @Column({ default: false })
  isCompleted: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
