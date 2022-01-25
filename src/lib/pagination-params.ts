import { IsNumberString } from "class-validator";

export class PaginationParams {
  @IsNumberString()
  page: string = '1';

  @IsNumberString()
  limit: string = '20';
}
