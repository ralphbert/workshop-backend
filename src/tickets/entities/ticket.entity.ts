import {CreateTicketDto} from '../dto/create-ticket.dto';
import {TicketPriority, TicketStatus} from '../dto/ticket.dto';

export class Ticket implements CreateTicketDto {
    id: number;
    title: string;
    description: string;
    priority: TicketPriority;
    color: string;
    status: TicketStatus;

    static create(id: number, title: string, description: string, priority: TicketPriority = 'normal', status: TicketStatus = 'planned', color = '#fff') {
        const ticket = new Ticket();
        ticket.id = id;
        ticket.title = title;
        ticket.description = description;
        ticket.priority = priority;
        ticket.status = status;
        ticket.color = color;
        return ticket;
    }
}
