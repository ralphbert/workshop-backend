import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { delay, map, tap } from 'rxjs';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('Users')
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
    @Query('delay') delayParams: string,
  ) {
    if (page == null || !limit) {
      throw new HttpException('Invalid arguments', HttpStatus.BAD_REQUEST);
    }

    let delayTime = 0;

    if (delayParams) {
      const parts = delayParams.split(',');

      if (parts.length === 2) {
        delayTime = Math.random() * parseFloat(parts[1]) + parseFloat(parts[0]);
      }
    }

    return this.usersService
      .getAll({
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        department: department?.toLowerCase(),
        level: level?.toLowerCase(),
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
        delay(delayTime),
        map((result) => {
          return {
            duration: delayTime / 1000,
            ...result,
          };
        }),
      );
  }
}
