import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { PaginatedResponse } from "../lib/crud-service.interface";
import { ProductEntity } from "./entities/product.entity";

describe("ProductsController", () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(() => {
    productsService = new ProductsService();
    productsService.getDatabaseName = () => 'test-products';
    productsController = new ProductsController(productsService);
  });

  describe("findAll", () => {
    it("should return an array of cats", async () => {
      const result: PaginatedResponse<ProductEntity> = {
        items: [],
        page: 1,
        pageSize: 20,
        totalPages: 1,
      };
      jest.spyOn(productsService, "findAll").mockImplementation(() => result);

      expect(await productsController.findAll({ page: '1', limit: '20' })).toBe(result);
    });
  });
});
