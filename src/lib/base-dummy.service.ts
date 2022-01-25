import {CrudStorage, IdEntity} from './crud-storage';
import {
    CrudServiceInterface,
    defaultPaginationParams,
    getPaginatedResponse,
    PaginatedResponse
} from "./crud-service.interface";
import { PaginationParams } from "./pagination-params";

export abstract class BaseDummyService<T extends IdEntity, CreateEntity, UpdateEntity> implements CrudServiceInterface<T, CreateEntity, UpdateEntity> {
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

    findAll(pagination: PaginationParams = defaultPaginationParams): PaginatedResponse<T> {
        return getPaginatedResponse(this.storage.getAll(), parseInt(pagination.page), parseInt(pagination.limit));
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
