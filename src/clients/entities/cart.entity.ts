import { ZedStoresBaseEntity } from 'src/@common/zedstores-base.entity';
import { Entity, OneToOne, OneToMany, Column } from 'typeorm';
import { Client } from './client.entity';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart extends ZedStoresBaseEntity {
  @OneToOne((type) => Client, (client) => client.id)
  client: Client;
  @OneToMany((type) => CartItem, (cartItem) => cartItem.cart)
  items: CartItem[];
  @Column({ nullable: false, type: 'decimal', precision: 5, scale: 2 })
  totalPrice: number;
  @Column({ nullable: false })
  totalQuantity: number;
}
