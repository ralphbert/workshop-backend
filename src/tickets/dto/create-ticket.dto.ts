import {TicketPriority, TicketStatus} from './ticket.dto';
import {ApiProperty} from '@nestjs/swagger';

export class CreateTicketDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty({
        description: 'Hex value like #ff0000'
    })
    color: string;

    @ApiProperty({
        enum: Object.values(TicketPriority)
    })
    priority: TicketPriority;

    @ApiProperty({
        enum: Object.values(TicketStatus)
    })
    status: TicketStatus;
}
