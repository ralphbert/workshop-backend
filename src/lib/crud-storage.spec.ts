import {CrudStorage} from './crud-storage';
import {HttpException} from '@nestjs/common';

interface TestEntity {
    id: number;
    name: string;
};

describe('CrudStorage', () => {
    let storage: CrudStorage<TestEntity>;

    beforeEach(() => {
        storage = new CrudStorage();
    });

    describe('add', () => {
        it('should add elements', async () => {
            const element: TestEntity = {
                id: 1,
                name: 'some title'
            };
            const result = [element];
            storage.add(element);
            expect(storage.getAll()).toEqual(result);
            expect(storage.getOne(1)).toBe(element);

            const element2: TestEntity = {
                id: 2,
                name: 'some title 2'
            };
            result.push(element2);
            storage.add(element2);
            expect(storage.getAll()).toEqual(result);
            expect(storage.getOne(2)).toBe(element2);

            const element3: TestEntity = {
                id: 3,
                name: 'some title 3'
            };
            result.push(element3);
            storage.add(element3);
            expect(storage.getAll()).toEqual(result);
            expect(storage.getOne(3)).toBe(element3);
        });
    });

    describe('remove', () => {
        it('should remove elements', async () => {
            storage = new CrudStorage<TestEntity>([{
                id: 10,
                name: 'Test entity'
            }, {
                id: 11,
                name: 'Test entity 2',
            }]);

            expect(storage.getOne(11)).toEqual({
                id: 11,
                name: 'Test entity 2',
            });
            expect(storage.getAll().length).toBe(2);

            storage.delete(11);
            expect(() => storage.getOne(11)).toThrow(HttpException);
            expect(() => storage.delete(11)).toThrow(HttpException);

            storage.delete(10);
            expect(() => storage.getOne(10)).toThrow(HttpException);
            expect(() => storage.delete(10)).toThrow(HttpException);
        });
    });

    describe('merge', () => {
        it('should merge elements', async () => {
            storage = new CrudStorage<TestEntity>([{
                id: 10,
                name: 'Test entity'
            }, {
                id: 11,
                name: 'Test entity 2',
            }]);

            expect(storage.getOne(10).name).toBe('Test entity');
            storage.merge(10, {name: 'foo'});
            expect(storage.getOne(10).name).toBe('foo');

            expect(storage.getOne(11).name).toBe('Test entity 2');
            storage.merge(11, {name: 'bar'});
            expect(storage.getOne(11).name).toBe('bar');

            expect(() => storage.merge(2, {})).toThrow(HttpException);
        });
    });

    describe('replace', () => {
        it('should replace elements', async () => {
            storage = new CrudStorage<TestEntity>([{
                id: 10,
                name: 'Test entity'
            }, {
                id: 11,
                name: 'Test entity 2',
            }]);

            expect(storage.getOne(10).name).toBe('Test entity');
            storage.replace(10, {name: 'foo', id: 100});
            expect(storage.getOne(100).name).toBe('foo');
            expect(() => storage.getOne(10)).toThrow(HttpException);

            expect(storage.getOne(11).name).toBe('Test entity 2');
            storage.replace(11, {name: 'bar', id: 111});
            expect(storage.getOne(111).name).toBe('bar');
            expect(() => storage.getOne(11)).toThrow(HttpException);
        });
    });
});
