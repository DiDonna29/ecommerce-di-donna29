import { Categories } from 'src/categories/entities/categories.entity';
import { OrderDetails } from 'src/order-details/entities/order-detail.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 50,
    unique: true,
  })
  name: string;

  @Column({
    length: 100,
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column()
  stock: number;

  @Column({
    type: 'text',
    default: 'https://assets.soyhenry.com/LOGO-REDES-01_og.jpg',
  })
  imgUrl: string;

  @ManyToMany(() => OrderDetails, (OrderDetails) => OrderDetails.products)
  orderDetails: OrderDetails[];

  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories;
}
