import { Controller, Get } from "@nestjs/common";

export interface TodoCreate {
  title: string;
  done?: boolean;
  due?: string;
}

export interface Todo extends TodoCreate {
  id: number;
}

const todos: Todo[] = [{
  id: 1,
  done: false,
  title: "Buy milk"
}, {
  id: 2,
  done: false,
  title: "Wash dishes"
}, {
  id: 3,
  done: false,
  title: "Vacuum house"
}];

let id = 4;

@Controller("todos")
export class TodosController {
  @Get('')
  getAll() {
    return todos;
  }

  @Post()
}
