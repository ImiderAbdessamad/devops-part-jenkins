import { IsOptional } from 'class-validator';

export class CreateProductStockStateDto {
  @IsOptional()
  name: string;

  @IsOptional()
  libelle: string;
}
