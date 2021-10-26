import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinsModule } from './coins/coins.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CoinsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
