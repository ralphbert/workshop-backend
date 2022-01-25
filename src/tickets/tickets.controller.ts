import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import {ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {TicketSettingsDto} from './dto/ticket-settings.dto';
import {Ticket} from './entities/ticket.entity';
import { PaginationParams } from "../lib/pagination-params";

@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @ApiOkResponse({
    type: TicketSettingsDto,
  })
  @Get('settings')
  getSettings() {
    return this.ticketsService.getSettings();
  }

  @ApiCreatedResponse({
    type: Ticket,
  })
  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @ApiOkResponse({
    type: [Ticket]
  })
  @Get()
  findAll(pagination: PaginationParams) {
    return this.ticketsService.findAll(pagination);
  }

  @ApiOkResponse({
    type: Ticket
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(+id);
  }

  @ApiOkResponse({
    type: Ticket
  })
  @ApiBody({ type: Ticket })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(+id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(+id);
  }
}
