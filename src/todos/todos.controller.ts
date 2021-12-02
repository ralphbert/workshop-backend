import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

export interface TodoCreate {
  title: string;
  done?: boolean;
  due?: string;
}

export interface Todo extends TodoCreate {
  id: number;
}

let todos: Todo[] = [
  {
    id: 1,
    done: false,
    title: 'Buy milk',
  },
  {
    id: 2,
    done: false,
    title: 'Wash dishes',
  },
  {
    id: 3,
    done: false,
    title: 'Vacuum house',
  },
];

let id = 4;

@Controller('todos')
export class TodosController {
  @UseGuards(JwtAuthGuard)
  @Get('')
  getAll() {
    return todos;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: TodoCreate) {
    console.log(body);
    const todo = {
      done: false,
      ...body,
      id: id++,
    };

    todos.push(todo);
    return todo;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    todos = todos.filter((todo) => todo.id !== +id);
    return;
  }
}
