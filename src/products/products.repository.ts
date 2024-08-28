import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Categories } from 'src/categories/entities/categories.entity';
import * as data from '../utils/data.json';

export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Products[]> {
    const products = await this.productsRepository.find({
      relations: {
        category: true,
      },
    });

    let inStock = products.filter((products) => products.stock > 0);

    const start = (page - 1) * limit;
    const end = start + +limit;

    inStock = inStock.slice(start, end);

    return inStock;
  }

  async getProduct(id: string) {
    const product = await this.productsRepository.findOneBy({ id });
    return product;
  }

  async addProducts() {
    const categories = await this.categoriesRepository.find();

    data?.map(async (element) => {
      const category = categories.find(
        (category) => category.name === element.category,
      );

      const products = new Products();
      products.name = element.name;
      products.description = element.description;
      products.price = element.price;
      products.stock = element.stock;
      products.category = category;

      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(products)
        .orUpdate(['description', 'price', 'stock'], ['name'])
        .execute();
    });
    return '¡Productos Agregados Correctamente!.';
  }

  // async addProducts() {
  //   const categories = await this.categoriesRepository.find();

  //   for (const element of data) {
  //     const category = categories.find(
  //       (category) => category.name === element.category,
  //     );

  //     if (!category) {
  //       console.error(
  //         `Categoría no encontrada para el producto: ${element.name}`,
  //       );
  //       continue;
  //     }

  //     const products = new Products();
  //     products.name = element.name;
  //     products.description = element.description;
  //     products.price = element.price;
  //     products.stock = element.stock;
  //     products.category = category;

  //     try {
  //       await this.productsRepository
  //         .createQueryBuilder()
  //         .insert()
  //         .into(Products)
  //         .values(products)
  //         .orUpdate(['description', 'price', 'stock'], ['name'])
  //         .execute();
  //     } catch (error) {
  //       console.error(`Error al agregar el producto ${element.name}:`, error);
  //     }
  //   }

  //   return '¡Productos Agregados Correctamente!.';
  // }

  async updateProduct(id: string, product: Products) {
    await this.productsRepository.update(id, product);
    const updateProduct = await this.productsRepository.findOneBy({ id });
    return updateProduct;
  }
}
