import { Product } from './entities/product.entity';

export class ProductsRepository {
  private Products: Product[] = [];

  findAll(): Product[] {
    return this.Products;
  }

  save(newProduct: Product): void {
    this.Products.push(newProduct);
  }
}
