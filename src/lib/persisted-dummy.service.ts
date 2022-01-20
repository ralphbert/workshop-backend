import { IdEntity } from "./crud-storage";
import { CrudServiceInterface } from "./crud-service.interface";
import { JsonDB } from "node-json-db";
import { getDatabase } from "../db.service";

export abstract class PersistedDummyService<T extends IdEntity, CreateEntity, UpdateEntity extends IdEntity> implements CrudServiceInterface<T, CreateEntity, UpdateEntity> {
  db: JsonDB;
  lastId = 1;

  abstract getDatabaseName(): string;

  constructor() {
    this.db = getDatabase(this.getDatabaseName());

    this.lastId = (this.findAll() || []).reduce((maxId, item) => {
      return Math.max(item.id, maxId);
    }, this.lastId);
  }

  create(createDto: CreateEntity): T {
    const item: any = {
      ...createDto,
      id: ++this.lastId
    };

    this.db.push("/items", item);

    return item as T;
  }

  findAll(): T[] {
    return (this.db.getData("/items") || []);
  }

  findOne(id: number): T | undefined {
    return this.findAll().find(item => item.id === id);
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
