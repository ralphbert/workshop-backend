import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TicketSettingsDto } from './dto/ticket-settings.dto';
import { Ticket } from './entities/ticket.entity';
import { getPaginatedResponse } from '../lib/crud-service.interface';
import { FilterParamsDto } from './dto/filter-params.dto';

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
    type: [Ticket],
  })
  @Get()
  findAll() {
    return this.ticketsService.getAll();
  }

  @ApiOkResponse({
    type: [Ticket],
  })
  @Get('list')
  findAllAsList(@Query() params: FilterParamsDto) {
    return getPaginatedResponse(
      this.ticketsService.getAll().filter((i: Ticket) => {
        if (params.q) {
          return i.title.toLowerCase().includes(params.q.toLowerCase());
        }

        return true;
      }),
      +params.page,
      +params.limit,
    );
  }

  @ApiOkResponse({
    type: Ticket,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(+id);
  }

  @ApiOkResponse({
    type: Ticket,
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
