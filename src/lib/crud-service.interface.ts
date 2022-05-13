import { IdEntity } from './crud-storage';

export interface CrudServiceInterface<
  T extends IdEntity,
  CreateEntity,
  UpdateEntity,
> {
  create(createDto: CreateEntity): T;
  findAll(): T[];
  findOne(id: number): T | undefined;
  update(id: number, updateDto: UpdateEntity): T;
  remove(id: number): void;
}
