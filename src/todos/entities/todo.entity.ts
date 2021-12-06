import {CreateTodoDto} from '../dto/create-todo.dto';

export class Todo implements CreateTodoDto {
    id: number;
    title: string;
    done: boolean;
    due?: string;

    static create(id: number, title: string) {
        const todo = new Todo();
        todo.id = id;
        todo.title = title;
        return todo;
    }
}
