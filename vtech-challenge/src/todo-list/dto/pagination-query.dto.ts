import { IsOptional, IsString } from 'class-validator';

export class PaginationQueryTodoList {
  @IsOptional()
  @IsString()
  todo: string;
}
