import { IdEntity } from './crud-storage';
import {
  CrudServiceInterface,
  defaultPaginationParams,
  getPaginatedResponse,
  PaginatedResponse,
  PaginationParams,
  toInt,
} from './crud-service.interface';
import { JsonDB } from 'node-json-db';
import { getDatabase } from '../db.service';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

const INITIAL_ID = 0;
export const DB_NAME = 'DB_NAME';

export abstract class PersistedDummyService<
  T extends IdEntity,
  CreateEntity,
  UpdateEntity extends IdEntity,
> implements CrudServiceInterface<T, CreateEntity, UpdateEntity>
{
  private db: JsonDB;
  lastId = INITIAL_ID;

  constructor(@Inject(DB_NAME) private databaseName: string) {
    this.db = getDatabase(this.getDatabaseName());

    if (!this.db.exists('/items')) {
      this.db.push('/items', []);
      this.lastId = INITIAL_ID;
    } else {
      this.lastId = (this.db.getData('/items') || []).reduce((maxId, item) => {
        return Math.max(item.id, maxId);
      }, INITIAL_ID);
    }
  }

  getDatabaseName(): string {
    return this.databaseName;
  }

  reset(initialData: T[] = []) {
    this.db.resetData({ items: initialData });
    this.lastId = INITIAL_ID;
  }

  deleteDatabase() {
    const dbPath = path.resolve(
      process.cwd(),
      this.getDatabaseName() + '.json',
    );
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
      console.log('db file deleted', dbPath);
    }
  }

  create(createDto: CreateEntity): T {
    const item: any = {
      ...createDto,
      id: ++this.lastId,
    };

    const items = this.getAll();
    items.push(item);

    this.db.push('/items', items);

    return item as T;
  }

  getAll() {
    return this.db.getData('/items') || [];
  }

  findAll(
    pagination: PaginationParams = defaultPaginationParams,
  ): PaginatedResponse<T> {
    return getPaginatedResponse(
      this.getAll(),
      toInt(pagination.page),
      toInt(pagination.limit),
    );
  }

  findOne(id: number): T | undefined {
    const item = this.getAll().find((item) => item.id === id);

    if (!item) {
      throw new HttpException(
        'Element with id ' + id + ' not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return item;
  }

  remove(id: number): void {
    const all = this.getAll().filter((item) => item.id !== id);
    this.db.push('/items', all);
  }

  update(id: number, updateDto: UpdateEntity): T {
    const all = this.getAll().map((item) => {
      if (item.id === id) {
        return updateDto;
      } else {
        return item;
      }
    });

    this.db.push('/items', all);

    return updateDto as any as T;
  }

  findAllByFilter(
    filterFn: (item: T) => boolean,
    pagination: PaginationParams,
  ): PaginatedResponse<T> {
    return getPaginatedResponse(
      this.getAll().filter(filterFn),
      toInt(pagination.page),
      toInt(pagination.limit),
    );
  }
}
