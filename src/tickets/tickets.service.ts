import {Injectable} from '@nestjs/common';
import {CreateTicketDto} from './dto/create-ticket.dto';
import {UpdateTicketDto} from './dto/update-ticket.dto';
import {Ticket} from './entities/ticket.entity';
import {BaseDummyService} from '../lib/base-dummy.service';
import {TicketPriorityList, TicketStatusList} from './dto/ticket.dto';
import {TicketSettingsDto} from './dto/ticket-settings.dto';

@Injectable()
export class TicketsService extends BaseDummyService<Ticket, CreateTicketDto, UpdateTicketDto> {
    constructor() {
        super([
            Ticket.create(1, 'Implement forms', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.'),
            Ticket.create(2, 'Add guards', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.'),
            Ticket.create(3, 'Implement login', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.'),
            Ticket.create(4, 'Implement interceptors', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.'),
        ]);
    }

    getNewEntity(): Ticket {
        return new Ticket();
    }

    getSettings(): TicketSettingsDto {
        return {
            status: [...TicketStatusList],
            priority: [...TicketPriorityList],
        }
    }
}