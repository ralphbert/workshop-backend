import { IdEntity } from "./crud-storage";
import { CrudServiceInterface, getPaginatedResponse, PaginatedResponse } from "./crud-service.interface";
import { JsonDB } from "node-json-db";
import { getDatabase } from "../db.service";
import { HttpException, HttpStatus, Query } from "@nestjs/common";

const INITIAL_ID = 0;

export abstract class PersistedDummyService<T extends IdEntity, CreateEntity, UpdateEntity extends IdEntity> implements
  CrudServiceInterface<T, CreateEntity, UpdateEntity> {
  db: JsonDB;
  lastId = INITIAL_ID;

  abstract getDatabaseName(): string;

  constructor() {
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

  reset(initialData: T[] = []) {
    this.db.resetData({ items: initialData });
    this.lastId = INITIAL_ID;
  }

  create(createDto: CreateEntity): T {
    const item: any = {
      ...createDto,
      id: ++this.lastId
    };

    const items = this.findAll();
    items.push(item);

    this.db.push("/items", items);

    return item as T;
  }

  findAll(@Query('page') page = "1", @Query('limit') limit = "20"): PaginatedResponse<T> {
    return getPaginatedResponse(
      (this.db.getData("/items") || []),
      parseInt(page),
      parseInt(limit),
    );
  }

  findOne(id: number): T | undefined {
    const item = this.findAll().find(item => item.id === id);

    if (!item) {
      throw new HttpException('Element with id ' + id + ' not found', HttpStatus.NOT_FOUND);
    }

    return item;
  }

  remove(id: number): void {
    const all = this.findAll().filter(item => item.id !== id);
    this.db.push("/items", all);
  }

  update(id: number, updateDto: UpdateEntity): T {
    const all = this.findAll().map(item => {
      if (item.id === id) {
        return updateDto;
      } else {
        return item;
      }
    });

    this.db.push("/items", all);

    return updateDto as any as T;
  }

}
