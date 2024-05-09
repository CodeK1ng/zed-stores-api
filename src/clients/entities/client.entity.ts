import { ZedStoresBaseEntity } from 'src/@common/zedstores-base.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
// import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';
import { Product } from 'src/products/entities/product.entity';
import { Cart } from './cart.entity';

@Entity()
export class Client extends ZedStoresBaseEntity {
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column({ nullable: true })
  phone: string;
  @OneToMany((type) => ClientAddress, (clientAddress) => clientAddress.client)
  addresses: ClientAddress[];
  @OneToMany((type) => SavedProduct, (savedProduct) => savedProduct.client)
  savedProducts: SavedProduct[];
  @OneToOne((type) => Cart, (cart) => cart.client)
  cart: Cart;
  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];
  @OneToMany(() => CartItem, (cartItem) => cartItem.client)
  cartItems: CartItem[];
}

@Entity()
export class Order extends ZedStoresBaseEntity {
  @ManyToOne((type) => Client, (client) => client.orders)
  client: Client;
  @OneToOne(() => Cart, (cart) => cart.id)
  cart: Cart;
  @Column({ nullable: false })
  totalPrice: number;
  @Column()
  status: OrderStatus;
  @Column()
  paymentMethod: PaymentMethod;
  @Column()
  paymentStatus: PaymentStatus;
  @Column()
  totalAmount: number;
}

export enum OrderStatus {
  PENDING = 'Pending',
  PROCESSING = 'Processing',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
}

export enum PaymentMethod {
  DEBIT_CARD = 'DebitCard',
  CASH_ON_DELIVERY = 'CashOnDelivery',
  MOBILE_MONEY = 'MobileMoney',
}

export enum PaymentStatus {
  PENDING = 'Pending',
  PAID = 'Paid',
  FAILED = 'Failed',
}

@Entity()
export class ClientAddress extends ZedStoresBaseEntity {
  @Column()
  address: string;
  @Column()
  city: string;
  @Column()
  province: string;
  @Column()
  country: string;
  @Column({ default: true })
  default: boolean;
  @ManyToOne((type) => Client, (client) => client.addresses)
  client: Client;
}

@Entity()
export class SavedProduct extends ZedStoresBaseEntity {
  @ManyToOne((type) => Product, (product) => product.id)
  product: Product;
  @ManyToOne((type) => Client, (client) => client.id)
  client: Client;
}
