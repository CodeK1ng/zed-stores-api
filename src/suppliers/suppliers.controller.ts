import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { Supplier } from './entities/supplier.entity';

@ApiTags('Suppliers')
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post('seed-data')
  async seedData(): Promise<string> {
    // Create sample suppliers and products
    const suppliers: CreateSupplierDto[] = Array.from({ length: 5 }, () => ({
      imageUrl: faker.image.imageUrl(),
      name: faker.company.name(),
      email: faker.internet.email(),
      phoneNumbers: [faker.phone.number()],
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      province: faker.address.state(),
      country: faker.address.country(),
    }));

    const createdSuppliers: Supplier[] = await Promise.all(
      suppliers.map((supplier) =>
        this.suppliersService.createSupplier(supplier),
      ),
    );

    const productsPromises: Promise<void>[] = [];
    createdSuppliers.forEach((supplier) => {
      const products = Array.from({ length: 3 }, () => ({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        discount: parseFloat(faker.random.numeric()),
        stock: 1000,
        imageUrls: [faker.image.imageUrl()],
        salePrice: parseFloat(faker.commerce.price()),
        sale: false,
        supplier: supplier,
      }));
      productsPromises.push(this.suppliersService.createProducts(products));
    });

    await Promise.all(productsPromises);

    return 'Data seeded successfully.';
  }

  @Post()
  @ApiOperation({ summary: 'Create a new supplier' })
  async createSupplier(@Body() createSupplierDto: CreateSupplierDto) {
    return this.suppliersService.createSupplier(createSupplierDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all suppliers' })
  async findAllSuppliers() {
    return this.suppliersService.findAllSuppliers();
  }

  @Get(':supplierId/products')
  @ApiOperation({ summary: 'List all products' })
  async findAllProducts(@Param('supplierId') supplierId: number) {
    return this.suppliersService.findAllProducts(supplierId);
  }

  @Get(':supplierId/products/:id')
  @ApiOperation({ summary: 'List all products' })
  async findOneProduct(@Param(':supplierId') supplierId: number, id: number) {
    return this.suppliersService.findOneProduct(supplierId, id);
  }
}
