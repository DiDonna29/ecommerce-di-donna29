import { OrderDetails } from 'src/order-details/entities/order-detail.entity';
import { Users } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.orders)
  orderDetails: OrderDetails;

  @ManyToOne(() => Users, (users) => users.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
