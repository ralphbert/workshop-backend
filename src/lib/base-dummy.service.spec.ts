import { HttpException } from '@nestjs/common';
import { BaseDummyService } from './base-dummy.service';

interface CreateEntity {
  name: string;
}

class Entity implements CreateEntity {
  id: number;
  name: string;
}

class DummyService extends BaseDummyService<
  Entity,
  CreateEntity,
  Partial<Entity>
> {
  constructor() {
    super();
  }

  getNewEntity(): Entity {
    return new Entity();
  }
}

describe('CrudStorage', () => {
  let service: DummyService;

  beforeEach(() => {
    service = new DummyService();
  });

  describe('add', () => {
    it('should add elements', async () => {
      const entity = service.create({ name: 'Test' });
      expect(entity).toEqual({ id: 1001, name: 'Test' });
      expect(service.findOne(1001)).toEqual({ id: 1001, name: 'Test' });
      expect(service.findAll().find((item) => item.id === 1001)).toEqual({
        id: 1001,
        name: 'Test',
      });
      expect(service.findAll().length).toBe(1);

      const entity2 = service.create({ name: 'Foo' });
      expect(entity2).toEqual({ id: 1002, name: 'Foo' });
      expect(service.findOne(1002)).toEqual({ id: 1002, name: 'Foo' });
      expect(service.findAll().find((item) => item.id === 1002)).toEqual({
        id: 1002,
        name: 'Foo',
      });
      expect(service.findAll().length).toBe(2);

      const updated = service.update(1002, { name: 'Bar' });
      expect(updated).toEqual({ id: 1002, name: 'Bar' });

      service.remove(1002);
      expect(service.findAll().length).toBe(1);
      expect(() => service.findOne(1002)).toThrow(HttpException);

      service.remove(1001);
      expect(service.findAll().length).toBe(0);
      expect(() => service.findOne(1001)).toThrow(HttpException);
    });
  });
});
