import { TicketPriority, TicketStatus } from './ticket.dto';
import { ApiProperty } from '@nestjs/swagger';

export class TicketSettingsDto {
  @ApiProperty({
    enum: [Object.values(TicketStatus)],
  })
  readonly status: TicketStatus[];
  @ApiProperty({
    enum: [Object.values(TicketPriority)],
  })
  readonly priority: TicketPriority[];
}
