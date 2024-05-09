import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { Client, SavedProduct } from './entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, SavedProduct, Cart, CartItem])],
  providers: [ClientsService],
  controllers: [ClientsController],
})
export class ClientsModule {}
