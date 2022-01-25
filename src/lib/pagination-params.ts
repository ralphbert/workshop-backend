import { IsNumberString } from "class-validator";

export class PaginationParams {
  @IsNumberString()
  page: string | number = '1';

  @IsNumberString()
  limit: string | number = '20';
}
