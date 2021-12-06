import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {TodosService} from './todos.service';
import {CreateTodoDto} from './dto/create-todo.dto';
import {UpdateTodoDto} from './dto/update-todo.dto';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('Todos')
@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createTodoDto: CreateTodoDto) {
        return this.todosService.create(createTodoDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.todosService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.todosService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
        return this.todosService.update(+id, updateTodoDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.todosService.remove(+id);
    }
}
