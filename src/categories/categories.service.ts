import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async addCategories() {
    try {
      return await this.categoriesRepository.addCategories();
    } catch (error) {
      return error;
    }
  }

  async getCategories() {
    try {
      return await this.categoriesRepository.getCategories();
    } catch (error) {
      return error;
    }
  }
}
