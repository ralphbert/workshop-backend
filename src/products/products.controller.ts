import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { initValues, ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ApiTags } from "@nestjs/swagger";
import { PaginationParams } from "../lib/pagination-params";

@ApiTags("Products")
@Controller("products")
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly service: ProductsService) {
  }

  @Post()
  create(@Body() createDto: CreateProductDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll(@Param() paginationParams: PaginationParams) {
    return this.service.findAll(paginationParams);
  }

  @Get('init')
  init() {
    this.service.reset(initValues);
    return 'OK'
  }

  @Get('tags')
  getTags() {
    return this.service.getTags();
  }

  @Get("tags/:tag")
  findAllByTag(@Param("tag") tag: string) {
    return this.service.findAllByTag(tag);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateDto: UpdateProductDto) {
    return this.service.update(+id, updateDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
