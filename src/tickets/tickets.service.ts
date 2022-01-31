import { Inject, Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { TicketPriority, TicketStatus } from './dto/ticket.dto';
import { TicketSettingsDto } from './dto/ticket-settings.dto';
import { DB_NAME, PersistedDummyService } from '../lib/persisted-dummy.service';

@Injectable()
export class TicketsService extends PersistedDummyService<
  Ticket,
  CreateTicketDto,
  UpdateTicketDto
> {
  constructor(@Inject(DB_NAME) databaseName: string) {
    super(databaseName);
  }

  getNewEntity(): Ticket {
    return new Ticket();
  }

  getSettings(): TicketSettingsDto {
    return {
      status: [...Object.values(TicketStatus)],
      priority: [...Object.values(TicketPriority)],
    };
  }
}
