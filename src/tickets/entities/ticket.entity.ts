import { CreateTicketDto } from '../dto/create-ticket.dto';
import { TicketPriority, TicketStatus } from '../dto/ticket.dto';
import { ApiProperty } from '@nestjs/swagger';

export class Ticket implements CreateTicketDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({
    description: 'The timestamp of the due date',
  })
  due?: string;

  @ApiProperty({
    description: 'The id of the assigned user',
  })
  userId: number;

  @ApiProperty({
    enum: Object.values(TicketPriority),
  })
  priority: TicketPriority;

  @ApiProperty()
  color: string;

  @ApiProperty({
    enum: Object.values(TicketStatus),
  })
  status: TicketStatus;

  static create(
    id: number,
    title: string,
    description: string,
    priority: TicketPriority = TicketPriority.normal,
    status: TicketStatus = TicketStatus.planned,
    color = '#fff',
  ) {
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
