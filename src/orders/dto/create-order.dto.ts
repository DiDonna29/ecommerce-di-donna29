import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Products } from 'src/products/entities/product.entity';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  products: Partial<Products[]>;
}
