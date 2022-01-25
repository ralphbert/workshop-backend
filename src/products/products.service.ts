import { Injectable } from '@nestjs/common';
import { BaseDummyService } from "../lib/base-dummy.service";
import { ProductEntity } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { PersistedDummyService } from "../lib/persisted-dummy.service";

export const initValues = [
  ProductEntity.create(1, 'PC', 1800, ['Computers'], 'https://dummyimage.com/400x350'),
  ProductEntity.create(2, 'MacBook', 2499, ['Computers'], 'https://dummyimage.com/400x350'),
  ProductEntity.create(3, 'MacBook Pro', 2999, ['Computers'], 'https://dummyimage.com/400x350'),
  ProductEntity.create(4, 'Laptop', 2100, ['Computers'], 'https://dummyimage.com/400x350'),
  ProductEntity.create(5, 'iPhone', 899, ['Mobile Phones'], 'https://dummyimage.com/400x350'),
  ProductEntity.create(6, 'Samsung S20', 799, ['Mobile Phones'], 'https://dummyimage.com/400x350'),
  ProductEntity.create(7, 'iPad', 1099, ['Tablets'], 'https://dummyimage.com/400x350'),
  ProductEntity.create(8, 'Android Tablet', 299, ['Tablets'], 'https://dummyimage.com/400x350'),
  ProductEntity.create(9, 'Washing Machine', 599, ['Household'], 'https://dummyimage.com/400x350'),
  ProductEntity.create(10, 'KitchenAid', 399, ['Household'], 'https://dummyimage.com/400x350'),
  ProductEntity.create(11, 'Pizza Oven', 599, ['Household'], 'https://dummyimage.com/400x350'),
  ProductEntity.create(12, 'Dishwasher', 299, ['Household'], 'https://dummyimage.com/400x350'),
];

@Injectable()
export class ProductsService extends PersistedDummyService<ProductEntity, CreateProductDto, UpdateProductDto>{
  getNewEntity(): ProductEntity {
    return new ProductEntity();
  }

  getTags() {
    const tags = this.getAll().reduce((allTags, product) => {
      return [...allTags, ...product.tags];
    }, []);

    return Array.from(new Set(tags)).sort();
  }

  findAllByTag(tag: string) {
    tag = tag.toLowerCase().trim();

    return this.getAll().filter(product => {
      const lowerTags = product.tags.map(t => t.toLowerCase().trim());
      return lowerTags.includes(tag);
    });
  }

  getDatabaseName(): string {
    return 'products';
  }
}
