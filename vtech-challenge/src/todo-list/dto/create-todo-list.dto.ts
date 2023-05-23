import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoListDto {
  @IsString()
  @IsNotEmpty()
  todo: string;

  @IsBoolean()
  @IsNotEmpty()
  isCompleted: boolean;
}
