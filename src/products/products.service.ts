import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  getProducts(page: number, limit: number) {
    return this.productsRepository.getProducts(page, limit);
  }

  addProducts() {
    return this.productsRepository.addProducts();
  }

  getProduct(id: string) {
    return this.productsRepository.getProduct(id);
  }

  updateProduct(id: string, product: any) {
    return this.productsRepository.updateProduct(id, product);
  }
}
