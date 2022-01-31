import { TicketPriority, TicketStatus } from './ticket.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  userId: number;

  @ApiProperty({
    description: 'Hex value like #ff0000',
  })
  @IsOptional()
  color: string;

  @ApiProperty({
    enum: Object.values(TicketPriority),
  })
  @IsOptional()
  priority: TicketPriority = TicketPriority.normal;

  @ApiProperty({
    enum: Object.values(TicketStatus),
  })
  @IsOptional()
  status: TicketStatus = TicketStatus.backlog;
}
