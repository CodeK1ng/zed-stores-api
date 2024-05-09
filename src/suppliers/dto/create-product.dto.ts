export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  imageUrls: string[];
  salePrice: number;
  sale: boolean;
}
