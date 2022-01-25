import { IdEntity } from "./crud-storage";

export function getPaginatedResponse<T>(items: T[], page: number, limit = 20): PaginatedResponse<T> {
  const normalizedPage = Math.max(0, page - 1);
  const slice = items.slice(normalizedPage * limit, normalizedPage * limit + limit);
  return {
    page,
    totalPages: Math.floor(items.length / limit) + 1,
    pageSize: limit,
    items: slice,
  };
}

export interface PaginatedResponse<T> {
  totalPages: number;
  page: number;
  pageSize: number;
  items: T[];
}

export interface CrudServiceInterface<T extends IdEntity, CreateEntity, UpdateEntity> {
  create(createDto: CreateEntity): T;
  findAll(): PaginatedResponse<T>;
  findOne(id: number): T | undefined;
  update(id: number, updateDto: UpdateEntity): T;
  remove(id: number): void;
}
