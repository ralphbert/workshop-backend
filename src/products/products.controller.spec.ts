import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { PaginatedResponse } from "../lib/crud-service.interface";
import { ProductEntity } from "./entities/product.entity";

describe("ProductsController", () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(() => {
    productsService = new ProductsService('test-products');
    productsController = new ProductsController(productsService);
  });

  afterAll(() => {
    productsService.deleteDatabase();
  })

  describe("findAll", () => {
    it("should return a empty list of products when service is empty", async () => {
      const result: PaginatedResponse<ProductEntity> = {
        items: [],
        page: 1,
        pageSize: 20,
        totalPages: 1,
        totalItems: 0,
      };
      expect(await productsController.findAll({ page: '1', limit: '20' })).toEqual(result);
    });

    it("should return list of products", async () => {
      for (let i = 1; i <= 102; i++) {
        productsService.create({
          name: 'Product ' + i,
          price: i + 100,
          tags: ['Computes', 'Mobile Phone']
        })
      }

      const result: PaginatedResponse<ProductEntity> = {
        items: [],
        page: 1,
        pageSize: 20,
        totalPages: 1,
        totalItems: 0,
      };
      const response = await productsController.findAll({ page: '1', limit: '20' });

      expect(response.page).toEqual(1);
      expect(response.items.length).toEqual(20);
      expect(response.totalPages).toEqual(6);
      expect(response.pageSize).toEqual(20);
      expect(response.totalItems).toEqual(102);
    });
  });
});
