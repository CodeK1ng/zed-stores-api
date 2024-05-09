import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  name: string;
  email: string;
  @ApiProperty({ required: false })
  phone: string;
}
