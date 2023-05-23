import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { PaginationQueryTodoList } from './dto/pagination-query.dto';

@Controller('api/todo')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @Post()
  create(@Body() createTodoListDto: CreateTodoListDto) {
    return this.todoListService.create(createTodoListDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationQueryTodoList) {
    return this.todoListService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoListService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoListDto: UpdateTodoListDto,
  ) {
    return this.todoListService.update(+id, updateTodoListDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todoListService.delete(+id);
  }
}
