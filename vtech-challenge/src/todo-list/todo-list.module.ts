import { Module } from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { TodoListController } from './todo-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from './entities/todo-list.entity';

@Module({
  controllers: [TodoListController],
  providers: [TodoListService],
  imports: [TypeOrmModule.forFeature([TodoList])],
})
export class TodoListModule {}
