import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  //   @IsNumber()
  @IsOptional()
  costPrice: number;

  //   @IsString()
  @IsOptional()
  sku: string;

  //   @IsNumber()
  @IsOptional()
  stockedQuantity: number;


  //   @IsString()
  @IsOptional()
  productCategoryName: string;

  //   @IsString()
  @IsOptional()
  productStockStateName: string;
}
