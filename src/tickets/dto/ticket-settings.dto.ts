import {TicketPriority, TicketStatus} from './ticket.dto';

export interface TicketSettingsDto {
    readonly status: TicketStatus[];
    readonly priority: TicketPriority[];
}
