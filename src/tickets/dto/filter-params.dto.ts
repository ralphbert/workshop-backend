import { PaginationParams } from '../../lib/crud-service.interface';
import { IsOptional, IsString } from 'class-validator';

export class FilterParamsDto extends PaginationParams {
  @IsOptional()
  @IsString()
  q: string;

  @IsOptional()
  @IsString()
  orderBy: string;

  @IsOptional()
  @IsString()
  direction: 'ASC' | 'DESC';
}
