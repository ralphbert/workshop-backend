import { HttpException } from '@nestjs/common';
import { PersistedDummyService } from './persisted-dummy.service';
import { PaginatedResponse, PaginationParams } from './crud-service.interface';

interface CreateEntity {
  name: string;
}

class Entity implements CreateEntity {
  id: number;
  name: string;
}

class DummyService extends PersistedDummyService<Entity, CreateEntity, Entity> {
  constructor() {
    super('test');
  }

  getNewEntity(): Entity {
    return new Entity();
  }
}

describe('CrudStorage', () => {
  let service: DummyService;

  beforeEach(() => {
    service = new DummyService();
    service.reset();
  });

  afterAll(() => service.deleteDatabase());

  describe('test reset', () => {
    it('should clear the state', () => {
      service.reset();
      expect(service.findAll()).toEqual({
        items: [],
        page: 1,
        pageSize: 20,
        totalPages: 1,
        totalItems: 0,
      } as PaginatedResponse<Entity>);
      expect(service.lastId).toEqual(0);

      service.create({ name: 'test 1' });
      expect(service.lastId).toEqual(1);

      service.create({ name: 'test 2' });
      expect(service.lastId).toEqual(2);

      service.remove(2);
      expect(service.lastId).toEqual(2);

      service.remove(1);
      expect(service.lastId).toEqual(2);
    });
  });

  describe('add', () => {
    it('should add elements', async () => {
      expect(service.findAll().items.length).toBe(0);
      expect(service.lastId).toBe(0);

      const entity = service.create({ name: 'Test' });
      expect(entity).toEqual({ id: 1, name: 'Test' });
      expect(service.findOne(1)).toEqual({ id: 1, name: 'Test' });
      expect(service.findAll().items.find((item) => item.id === 1)).toEqual({
        id: 1,
        name: 'Test',
      });
      expect(service.findAll().items.length).toBe(1);
      expect(service.lastId).toBe(1);

      const entity2 = service.create({ name: 'Foo' });
      expect(entity2).toEqual({ id: 2, name: 'Foo' });
      expect(service.findOne(2)).toEqual({ id: 2, name: 'Foo' });
      expect(service.findAll().items.find((item) => item.id === 2)).toEqual({
        id: 2,
        name: 'Foo',
      });
      expect(service.findAll().items.length).toBe(2);
      expect(service.lastId).toBe(2);

      const updated = service.update(3, { name: 'Bar', id: 3 });
      expect(updated).toEqual({ id: 3, name: 'Bar' });

      service.remove(2);
      expect(service.findAll().items.length).toBe(1);
      expect(() => service.findOne(2)).toThrow(HttpException);

      service.remove(1);
      expect(service.findAll().items.length).toBe(0);
      expect(() => service.findOne(1)).toThrow(HttpException);
    });
  });

  describe('pagination', () => {
    it('should find all', () => {
      let response: PaginatedResponse<Entity>;
      service.reset();

      response = service.findAll();
      expect(response.page).toEqual(1);
      expect(response.pageSize).toEqual(20);
      expect(response.items.length).toEqual(0);
      expect(response.totalPages).toEqual(1);
      expect(response.totalItems).toEqual(0);

      const toAdd = 45;

      for (let i = 1; i <= toAdd; i++) {
        service.create({
          name: 'Test ' + i,
        });
      }

      response = service.findAll();
      expect(response.page).toEqual(1);
      expect(response.pageSize).toEqual(20);
      expect(response.items.length).toEqual(20);
      expect(response.totalPages).toEqual(3);
      expect(response.totalItems).toEqual(45);

      response = service.findAll({ page: 1, limit: 10 });
      expect(response.page).toEqual(1);
      expect(response.pageSize).toEqual(10);
      expect(response.items.length).toEqual(10);
      expect(response.totalPages).toEqual(5);
      expect(response.totalItems).toEqual(45);

      response = service.findAll({ page: 2, limit: 10 });
      expect(response.page).toEqual(2);
      expect(response.pageSize).toEqual(10);
      expect(response.items.length).toEqual(10);
      expect(response.totalPages).toEqual(5);
      expect(response.totalItems).toEqual(45);

      response = service.findAll({ page: 100, limit: 10 });
      expect(response.page).toEqual(100);
      expect(response.pageSize).toEqual(10);
      expect(response.items.length).toEqual(0);
      expect(response.totalPages).toEqual(5);
      expect(response.totalItems).toEqual(45);

      response = service.findAll({ page: -2, limit: 10 });
      expect(response.page).toEqual(1);
      expect(response.pageSize).toEqual(10);
      expect(response.items.length).toEqual(10);
      expect(response.totalPages).toEqual(5);
      expect(response.totalItems).toEqual(45);

      response = service.findAll({ page: 1, limit: -10 });
      expect(response.page).toEqual(1);
      expect(response.pageSize).toEqual(20);
      expect(response.items.length).toEqual(20);
      expect(response.totalPages).toEqual(3);
      expect(response.totalItems).toEqual(45);

      response = service.findAll({ page: -10, limit: -10 });
      expect(response.page).toEqual(1);
      expect(response.pageSize).toEqual(20);
      expect(response.items.length).toEqual(20);
      expect(response.totalPages).toEqual(3);
      expect(response.totalItems).toEqual(45);

      response = service.findAll({ page: 1, limit: 1000 });
      expect(response.page).toEqual(1);
      expect(response.pageSize).toEqual(1000);
      expect(response.items.length).toEqual(45);
      expect(response.totalPages).toEqual(1);
      expect(response.totalItems).toEqual(45);
    });

    it('should filter all', () => {
      let response: PaginatedResponse<Entity>;
      service.reset();
      response = service.findAll();
      expect(response.page).toEqual(1);
      expect(response.pageSize).toEqual(20);
      expect(response.items.length).toEqual(0);
      expect(response.totalPages).toEqual(1);
      expect(response.totalItems).toEqual(0);

      for (let i = 1; i <= 21; i++) {
        service.create({
          name: 'Foo ' + i,
        });
      }

      for (let i = 1; i <= 21; i++) {
        service.create({
          name: 'Bar ' + i,
        });
      }

      for (let i = 1; i <= 21; i++) {
        service.create({
          name: 'Baz ' + i,
        });
      }

      response = service.findAll();
      expect(response.page).toEqual(1);
      expect(response.pageSize).toEqual(20);
      expect(response.items.length).toEqual(20);
      expect(response.totalPages).toEqual(4);
      expect(response.totalItems).toEqual(63);

      const pagination: PaginationParams = {
        page: 1,
        limit: 10,
      };

      const words = ['Foo', 'Bar', 'Baz'];

      words.forEach((word) => {
        response = service.findAllByFilter((item) => item.name.includes(word), {
          ...pagination,
        });
        expect(response.items.length).toEqual(10);
        expect(response.totalPages).toEqual(3);
        expect(response.totalItems).toEqual(21);
      });

      pagination.page = 2;

      words.forEach((word) => {
        response = service.findAllByFilter((item) => item.name.includes(word), {
          ...pagination,
        });
        expect(response.items.length).toEqual(10);
        expect(response.totalPages).toEqual(3);
        expect(response.totalItems).toEqual(21);
      });

      pagination.page = 10;

      words.forEach((word) => {
        response = service.findAllByFilter((item) => item.name.includes(word), {
          ...pagination,
        });
        expect(response.items.length).toEqual(0);
        expect(response.totalPages).toEqual(3);
        expect(response.totalItems).toEqual(21);
      });
    });
  });
});
