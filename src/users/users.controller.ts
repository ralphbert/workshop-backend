import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { tap } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  getAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('department') department: string,
    @Query('level') level: string,
    @Query('errorRate') errorRate: string,
  ) {
    if (page == null || !limit || !department || !level) {
      throw new HttpException('Invalid arguments', HttpStatus.BAD_REQUEST);
    }

    return this.usersService
      .getAll({
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        department: department.toLowerCase(),
        level: level.toLowerCase(),
      })
      .pipe(
        tap(() => {
          const error = parseFloat(errorRate);

          if (!isNaN(error) && error <= 1 && error >= 0) {
            if (Math.random() <= error) {
              throw new HttpException(
                'Oh snap! Dummy error raised.',
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
            }
          }
        }),
      );
  }
}
