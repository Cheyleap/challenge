import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoList } from './entities/todo-list.entity';
import { FindOptionsOrder, ILike, Repository } from 'typeorm';
import { ResourceNotFoundException } from '../common/exception';
import { PaginationQueryTodoList } from './dto/pagination-query.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoListService {
  constructor(
    @InjectRepository(TodoList)
    private readonly todoListRepository: Repository<TodoList>,
  ) {}

  async create(createTodoListDto: CreateTodoListDto) {
    const date = new Date();
    return await this.todoListRepository.save({
      ...createTodoListDto,
      createdAt: date,
    });
  }

  async findAll(pagination: PaginationQueryTodoList): Promise<TodoList[]> {
    return await this.todoListRepository.find({
      where: {
        todo: pagination.todo ? ILike(`%${pagination.todo}%`) : null,
      },
      order: 'ASC' as FindOptionsOrder<TodoList>,
    });
  }

  async findOne(id: number) {
    const todoList = await this.checkTodoList(id);
    return todoList;
  }

  async update(
    id: number,
    updateTodoListDto: UpdateTodoListDto,
  ): Promise<TodoList> {
    const todoList: TodoList = await this.checkTodoList(id);
    return await this.todoListRepository.save(
      Object.assign(todoList, updateTodoListDto),
    );
  }

  async delete(id: number): Promise<void> {
    await this.checkTodoList(id);
    await this.todoListRepository.delete(id);
  }

  async checkTodoList(id: number): Promise<TodoList> {
    const todoList: TodoList = await this.todoListRepository.findOneBy({ id });
    if (!todoList) {
      throw new ResourceNotFoundException(`Resource of todo ${id} not found`);
    }
    return todoList;
  }
}
