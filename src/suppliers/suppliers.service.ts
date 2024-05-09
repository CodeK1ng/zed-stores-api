import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly suppliersRepository: Repository<Supplier>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async createProducts(products: CreateProductDto[]): Promise<void> {
    const createdProducts = this.productsRepository.create(products);
    await this.productsRepository.save(createdProducts);
  }

  async findAllSuppliers(): Promise<Supplier[]> {
    return this.suppliersRepository.find({ relations: ['products'] });
  }

  async findOneSupplier(id: number): Promise<Supplier> {
    return this.suppliersRepository.findOne({
      where: { id },
    });
  }

  async createSupplier(supplier: CreateSupplierDto): Promise<Supplier> {
    return this.suppliersRepository.save(supplier);
  }

  async findAllProducts(supplierId: number): Promise<Product[]> {
    const supplier = await this.suppliersRepository.findOne({
      where: { id: supplierId },
    });

    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${supplierId} not found`);
    }

    return this.productsRepository.find({
      where: { supplier: supplier },
    });
  }

  async findOneProduct(supplierId: number, id: number): Promise<Product> {
    const supplier = await this.suppliersRepository.findOne({
      where: { id: supplierId },
    });

    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${supplierId} not found`);
    }

    return this.productsRepository.findOne({
      where: { id },
    });
  }

  async createProduct(
    supplierId: number,
    product: CreateProductDto,
  ): Promise<Product> {
    const supplier = await this.suppliersRepository.findOne({
      where: { id: supplierId },
    });

    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${supplierId} not found`);
    }

    const newProduct = this.productsRepository.create({
      ...product,
      supplier: supplier,
    });

    return this.productsRepository.save(newProduct);
  }
}
