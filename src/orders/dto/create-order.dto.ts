import { Products } from 'src/products/entities/product.entity';

export class CreateOrderDto {
  userId: string;
  products: Partial<Products[]>;
}
