import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { DB_NAME } from "../lib/persisted-dummy.service";

@Module({
  providers: [
    ProductsService,
    {
      provide: DB_NAME,
      useValue: "dbs/products"
    }
  ],
  controllers: [ProductsController]
})
export class ProductsModule {
}
