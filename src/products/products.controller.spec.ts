import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PaginatedResponse } from '../lib/crud-service.interface';
import { ProductEntity } from './entities/product.entity';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(() => {
    productsService = new ProductsService('test-products');
    productsController = new ProductsController(productsService);
  });

  afterAll(() => {
    productsService.deleteDatabase();
  });

  describe('findAll', () => {
    it('should return a empty list of products when service is empty', async () => {
      const result: PaginatedResponse<ProductEntity> = {
        items: [],
        page: 1,
        pageSize: 20,
        totalPages: 1,
        totalItems: 0,
      };
      expect(
        await productsController.findAll({ page: '1', limit: '20' }),
      ).toEqual(result);
    });

    it('should return list of products', async () => {
      for (let i = 1; i <= 102; i++) {
        productsService.create({
          name: 'Product ' + i,
          price: i + 100,
          tags: ['Computes', 'Mobile Phone'],
        });
      }

      const response = await productsController.findAll({
        page: '1',
        limit: '20',
      });

      expect(response.page).toEqual(1);
      expect(response.items.length).toEqual(20);
      expect(response.totalPages).toEqual(6);
      expect(response.pageSize).toEqual(20);
      expect(response.totalItems).toEqual(102);
    });

    it('should search by a name', async () => {
      for (let i = 1; i <= 100; i++) {
        productsService.create({
          name: 'Product ' + i,
          price: i + 100,
          tags: ['Computes', 'Mobile Phone'],
        });
      }

      for (let i = 1; i <= 10; i++) {
        productsService.create({
          name: 'Foo ' + i,
          price: i + 100,
          tags: ['Computes', 'Mobile Phone'],
        });
      }

      let response = await productsController.search({
        page: '1',
        limit: '20',
        q: 'foo',
      });

      expect(response.page).toEqual(1);
      expect(response.items.length).toEqual(10);
      expect(response.totalPages).toEqual(1);
      expect(response.pageSize).toEqual(20);
      expect(response.totalItems).toEqual(10);

      response = await productsController.search({
        page: '2',
        limit: '3',
        q: 'foo',
      });

      expect(response.page).toEqual(2);
      expect(response.items.length).toEqual(3);
      expect(response.totalPages).toEqual(4);
      expect(response.pageSize).toEqual(3);
      expect(response.totalItems).toEqual(10);
    });
  });
});
