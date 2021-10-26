import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { Department, Level, UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('department') department: Department,
    @Query('level') level: Level,
  ) {
    if (page == null || !limit || !department || !level) {
      throw new HttpException('Invalid arguments', HttpStatus.BAD_REQUEST);
    }

    return this.usersService.getAll({
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      department,
      level,
    });
  }
}
