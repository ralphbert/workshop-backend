import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {TodosService} from './todos.service';
import {CreateTodoDto} from './dto/create-todo.dto';
import {UpdateTodoDto} from './dto/update-todo.dto';
import {ApiTags} from '@nestjs/swagger';
import { PaginationParams } from "../lib/crud-service.interface";

@ApiTags('Todos')
@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
    constructor(private readonly todosService: TodosService) {
    }

    @Post()
    create(@Body() createTodoDto: CreateTodoDto) {
        return this.todosService.create(createTodoDto);
    }

    @Get()
    findAll(@Query() pagination: PaginationParams) {
        return this.todosService.findAll(pagination);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.todosService.findOne(+id);
    }


    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
        return this.todosService.update(+id, updateTodoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.todosService.remove(+id);
    }
}
