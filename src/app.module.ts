import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinsModule } from './coins/coins.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';
import { TicketsModule } from './tickets/tickets.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [CoinsModule, UsersModule, AuthModule, TodosModule, TicketsModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
