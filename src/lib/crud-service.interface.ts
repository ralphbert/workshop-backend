import { IdEntity } from "./crud-storage";
import { IsNumberString } from "class-validator";

export function getPaginatedResponse<T>(items: T[], _page: number = 1, _limit = 20): PaginatedResponse<T> {
  let page = _page < 0 ? +defaultPaginationParams.page : _page;
  const limit = _limit <= 0 ? +defaultPaginationParams.limit : _limit;

  const normalizedPage = Math.max(0, page - 1);
  let start = normalizedPage * limit;
  const totalPages = Math.max(Math.ceil(items.length / limit), 1);
  const end = start + limit;
  const slice = items.slice(start, end);

  return {
    page,
    totalPages,
    pageSize: limit,
    items: slice,
    totalItems: items.length,
  };
}

export class PaginationParams {
  @IsNumberString()
  page: string | number = 1;

  @IsNumberString()
  limit: string | number = 20;
}

export interface PaginatedResponse<T> {
  totalItems: number;
  totalPages: number;
  page: number;
  pageSize: number;
  items: T[];
}

export const defaultPaginationParams: PaginationParams = {
  page: '1',
  limit: '20',
};

export interface CrudServiceInterface<T extends IdEntity, CreateEntity, UpdateEntity> {
  create(createDto: CreateEntity): T;
  findAll(pagination: PaginationParams): PaginatedResponse<T>;
  findAllByFilter(filterFn: (item: T) => boolean, pagination: PaginationParams): PaginatedResponse<T>;
  findOne(id: number): T | undefined;
  update(id: number, updateDto: UpdateEntity): T;
  remove(id: number): void;
}

export function toInt(n: string | number) {
  return parseInt(String(n));
}
