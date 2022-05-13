import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { BaseDummyService } from '../lib/base-dummy.service';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService extends BaseDummyService<
  Todo,
  CreateTodoDto,
  UpdateTodoDto
> {
  constructor() {
    super([
      Todo.create(1, 'Buy milk'),
      Todo.create(2, 'Wash dishes'),
      Todo.create(3, 'Vacuum house'),
    ]);
  }

  getNewEntity(): Todo {
    return new Todo();
  }
}
