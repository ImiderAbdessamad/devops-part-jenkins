import { IsOptional } from 'class-validator';

export class CreateProductCategoryDto {
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;
}
