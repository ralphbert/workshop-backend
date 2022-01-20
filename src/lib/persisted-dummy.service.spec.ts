import { HttpException } from "@nestjs/common";
import { PersistedDummyService } from "./persisted-dummy.service";

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
      expect(service.findAll()).toEqual([]);
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
      expect(service.findAll().length).toBe(0);
      expect(service.lastId).toBe(0);

      const entity = service.create({ name: "Test" });
      expect(entity).toEqual({ id: 1, name: "Test" });
      expect(service.findOne(1)).toEqual({ id: 1, name: "Test" });
      expect(service.findAll().find(item => item.id === 1)).toEqual({ id: 1, name: "Test" });
      expect(service.findAll().length).toBe(1);
      expect(service.lastId).toBe(1);

      const entity2 = service.create({ name: "Foo" });
      expect(entity2).toEqual({ id: 2, name: "Foo" });
      expect(service.findOne(2)).toEqual({ id: 2, name: "Foo" });
      expect(service.findAll().find(item => item.id === 2)).toEqual({ id: 2, name: "Foo" });
      expect(service.findAll().length).toBe(2);
      expect(service.lastId).toBe(2);

      const updated = service.update(3, { name: "Bar", id: 3 });
      expect(updated).toEqual({ id: 3, name: "Bar" });

      service.remove(2);
      expect(service.findAll().length).toBe(1);
      expect(() => service.findOne(2)).toThrow(HttpException);

      service.remove(1);
      expect(service.findAll().length).toBe(0);
      expect(() => service.findOne(1)).toThrow(HttpException);
    });
  });
});
