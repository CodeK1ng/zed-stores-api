import { ZedStoresBaseEntity } from 'src/@common/zedstores-base.entity';
import {
  ProductCondition,
  Supplier,
} from 'src/suppliers/entities/supplier.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class Color extends ZedStoresBaseEntity {
  @Column({ unique: true })
  code: string;
  @Column()
  name: string;
}

@Entity()
export class Product extends ZedStoresBaseEntity {
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column({ nullable: true })
  productType: string;
  @Column({ type: 'decimal', precision: 5, scale: 2 })
  price: number;
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  discountRate: number;
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  discountPrice: number;
  @Column({ nullable: false, default: 0 })
  quantity: number;
  @Column('simple-array', { nullable: true })
  imageUrls: string[];
  @Column()
  sale: boolean;
  @Column({ nullable: true })
  condition: ProductCondition;
  @ManyToOne(() => Color, (color) => color.id)
  color: Color;
  @Column({ default: false })
  isOutOfStock: boolean;
  @ManyToOne((type) => Supplier, (supplier) => supplier.products)
  supplier: Supplier;
}

@Entity()
export class Category extends ZedStoresBaseEntity {
  @Column({ unique: true })
  code: string;
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column({ nullable: true })
  imageUrl: string;
}
