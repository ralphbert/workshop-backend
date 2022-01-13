import { Injectable } from '@nestjs/common';
import { BaseDummyService } from "../lib/base-dummy.service";
import { ProductEntity } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService extends BaseDummyService<ProductEntity, CreateProductDto, UpdateProductDto>{
  constructor() {
    super([
      ProductEntity.create(1, 'PC', 1800, ['Computers']),
      ProductEntity.create(2, 'Laptop', 2100, ['Computers']),
      ProductEntity.create(3, 'iPhone', 899, ['Mobile Phones']),
      ProductEntity.create(4, 'Samsung S20', 799, ['Mobile Phones']),
      ProductEntity.create(5, 'iPad', 1099, ['Tablets']),
    ]);
  }

  getNewEntity(): ProductEntity {
    return new ProductEntity();
  }

  getTags() {
    const tags = this.findAll().reduce((allTags, product) => {
      return [...allTags, ...product.tags];
    }, []);

    return Array.from(new Set(tags)).sort();
  }

  findAllByTag(tag: string) {
    return this.findAll().filter(product => product.tags.includes(tag));
  }
}
