import { Orders } from 'src/orders/entities/order.entity';
import { Products } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @OneToOne(() => Orders, (orders) => orders.orderDetails)
  @JoinColumn({
    name: 'order_id',
  })
  orders: Orders;

  @ManyToMany(() => Products)
  @JoinTable({
    name: 'order_details_products',
  })
  products: Products[];
}
