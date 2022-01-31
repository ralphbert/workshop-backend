import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { DB_NAME } from '../lib/persisted-dummy.service';

@Module({
  controllers: [TicketsController],
  providers: [
    TicketsService,
    {
      provide: DB_NAME,
      useValue: 'dbs/tickets',
    },
  ],
})
export class TicketsModule {}
