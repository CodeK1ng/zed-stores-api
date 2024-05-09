import { ZedStoresBaseEntity } from 'src/@common/zedstores-base.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Supplier extends ZedStoresBaseEntity {
  @Column()
  imageUrl: string;
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column({ nullable: true, default: 'Electronics' })
  productsType: string;
  @Column({ unique: true })
  email: string;
  @Column('simple-array', { nullable: true })
  phoneNumbers: string[];
  @Column()
  address: string;
  @Column()
  city: string;
  @Column()
  province: string;
  @Column()
  country: string;
  @OneToMany((type) => Product, (product) => product.supplier)
  products: Product[];
}

export enum ProductCondition {
  NEW = 'New',
  USED = 'Used',
  REFURBISHED = 'Refurbished',
}
