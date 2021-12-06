import {CrudStorage, IdEntity} from './crud-storage';

export abstract class BaseDummyService<T extends IdEntity, CreateEntity, UpdateEntity> {
    storage: CrudStorage<T>;

    constructor(private items: T[] = []) {
        this.storage = new CrudStorage<T>(items);
    }

    create(createDto: CreateEntity) {
        const entity = this.getNewEntity()
        Object.assign(entity, createDto);
        entity.id = this.storage.getNextId();
        return this.storage.add(entity);
    }

    findAll() {
        return this.storage.getAll();
    }

    findOne(id: number) {
        return this.storage.getOne(id);
    }

    update(id: number, updateDto: UpdateEntity) {
        return this.storage.merge(id, updateDto);
    }

    remove(id: number) {
        return this.storage.delete(id);
    }

    abstract getNewEntity(): T;
}
