import { Controller, Get, HttpException, HttpStatus, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { map } from "rxjs";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Get("")
  getAll(
    @Query("page") page: string,
    @Query("limit") limit: string,
    @Query("department") department: string,
    @Query("level") level: string
  ) {
    if (page == null || !limit) {
      throw new HttpException("Invalid arguments", HttpStatus.BAD_REQUEST);
    }

    let delayTime = 0;

    return this.usersService
      .getAll({
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        department: department?.toLowerCase(),
        level: level?.toLowerCase()
      })
      .pipe(
        map((result) => {
          return {
            duration: delayTime / 1000,
            ...result
          };
        })
      );
  }
}
