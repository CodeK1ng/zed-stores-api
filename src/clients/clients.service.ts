import { Injectable } from '@nestjs/common';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from './dtos/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly catsRepository: Repository<Client>,
  ) {}

  async findAll(): Promise<Client[]> {
    return this.catsRepository.find();
  }

  async findOne(id: number): Promise<Client> {
    return this.catsRepository.findOne({
      where: { id },
    });
  }

  async create(client: CreateClientDto): Promise<Client> {
    return this.catsRepository.save(client);
  }
}
