import { HttpException } from "@nestjs/common";
import { PersistedDummyService } from "./persisted-dummy.service";
import { PaginatedResponse } from "./crud-service.interface";

interface CreateEntity {
  name: string;
}

class Entity implements CreateEntity {
  id: number;
  name: string;
}

class DummyService extends PersistedDummyService<Entity, CreateEntity, Entity> {
  constructor() {
    super();
  }

  getNewEntity(): Entity {
    return new Entity();
  }

  getDatabaseName(): string {
    return "test";
  }
}

describe("CrudStorage", () => {
  let service: DummyService;

  beforeEach(() => {
    service = new DummyService();
    service.reset();
  });

  describe('test reset', () => {
    it('should clear the state', () => {
      service.reset();
      expect(service.findAll()).toEqual({
        items: [],
        page: 1,
        pageSize: 20,
        totalPages: 1
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
    })
  })

  describe("add", () => {
    it("should add elements", async () => {
      expect(service.findAll().items.length).toBe(0);
      expect(service.lastId).toBe(0);

      const entity = service.create({ name: "Test" });
      expect(entity).toEqual({ id: 1, name: "Test" });
      expect(service.findOne(1)).toEqual({ id: 1, name: "Test" });
      expect(service.findAll().items.find(item => item.id === 1)).toEqual({ id: 1, name: "Test" });
      expect(service.findAll().items.length).toBe(1);
      expect(service.lastId).toBe(1);

      const entity2 = service.create({ name: "Foo" });
      expect(entity2).toEqual({ id: 2, name: "Foo" });
      expect(service.findOne(2)).toEqual({ id: 2, name: "Foo" });
      expect(service.findAll().items.find(item => item.id === 2)).toEqual({ id: 2, name: "Foo" });
      expect(service.findAll().items.length).toBe(2);
      expect(service.lastId).toBe(2);

      const updated = service.update(3, { name: "Bar", id: 3 });
      expect(updated).toEqual({ id: 3, name: "Bar" });

      service.remove(2);
      expect(service.findAll().items.length).toBe(1);
      expect(() => service.findOne(2)).toThrow(HttpException);

      service.remove(1);
      expect(service.findAll().items.length).toBe(0);
      expect(() => service.findOne(1)).toThrow(HttpException);
    });
  });

  describe('pagination', () => {
    it('should fetch correct page', () => {
      service.reset();
      const toAdd = 50;

      for (let i = 1; i <= toAdd; i++) {
        service.create({
          name: 'Test ' + i,
        });
      }

      let response: PaginatedResponse<Entity>;

      response = service.findAll();
      expect(response.page).toEqual(1);
      expect(response.pageSize).toEqual(20);
      expect(response.items.length).toEqual(20);
      expect(response.totalPages).toEqual(3);

      response = service.findAll({ page: 1, limit: 10 });
      expect(response.page).toEqual(1);
      expect(response.pageSize).toEqual(10);
      expect(response.items.length).toEqual(10);
      expect(response.totalPages).toEqual(5);
    })
  })
});
