import { CreateProductDto } from "../dto/create-product.dto";

export class ProductEntity implements CreateProductDto {
  id: number;
  name: string;
  price: number;
  tags: string[];
  image: string;

  static create(id: number, name: string, price: number, tags: string[] = [], image: string = null) {
    const p = new ProductEntity();
    p.id = id;
    p.name = name;
    p.price = price;
    p.tags = [...tags];
    p.image = image;
    return p;
  }
}
