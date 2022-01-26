import { PaginationParams } from "../../lib/crud-service.interface";
import { IsString } from "class-validator";

export class SearchParamsDto extends PaginationParams {
  @IsString()
  q: string;
}
