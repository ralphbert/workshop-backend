import { HttpException, HttpStatus } from '@nestjs/common';

export type IdEntity = { id: number };

export class CrudStorage<T extends IdEntity> {
  id = 1000;

  constructor(public items: T[] = []) {}

  delete(id: number): void {
    this.throwIfNotExisting(id);
    this.items = this.items.filter((item) => item.id !== id);
  }

  replace(id: number, newValue: T): T {
    this.throwIfNotExisting(id);
    this.items = this.items.map((item) => (item.id === id ? newValue : item));
    return newValue;
  }

  merge(id: number, newValue: Partial<T>): T {
    const existing = this.throwIfNotExisting(id);
    const merged = { ...existing, ...newValue };
    this.replace(id, merged);
    return merged;
  }

  add(item: T) {
    this.items = [...this.items, item];
    return item;
  }

  getOne(id: number): T {
    return this.throwIfNotExisting(id);
  }

  getAll(): T[] {
    return [...this.items];
  }

  getNextId() {
    this.id += 1;
    return this.id;
  }

  private throwIfNotExisting(id: number) {
    const found = this.items.find((item) => item.id === id);

    if (!found) {
      throw new HttpException(
        'Entity with id ' + id + ' not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return found;
  }
}
