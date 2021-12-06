import {TicketPriority, TicketStatus} from './ticket.dto';

export class CreateTicketDto {
    title: string;
    description: string;
    priority: TicketPriority;
    color: string;
    status: TicketStatus;
}
