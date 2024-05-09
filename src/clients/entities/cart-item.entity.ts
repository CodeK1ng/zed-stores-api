import { ZedStoresBaseEntity } from 'src/@common/zedstores-base.entity';
import { Entity, ManyToOne, Column, JoinColumn } from 'typeorm';
// import { Cart } from './cart.entity';
import { Client } from './client.entity';
import { Product } from 'src/products/entities/product.entity';
import { Cart } from './cart.entity';

@Entity()
export class CartItem extends ZedStoresBaseEntity {
  @ManyToOne(() => Client, (client) => client.cartItems)
  client: Client;
  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;
  @Column({ nullable: false })
  quantity: number;
  @Column({ nullable: false, type: 'decimal', precision: 5, scale: 2 })
  totalAmount: number;
  @ManyToOne((type) => Cart, (cart) => cart.id)
  cart: Cart;
}
