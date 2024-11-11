import { PartialType } from '@nestjs/mapped-types';
import { CreateProductStockStateDto } from './create-product-stock-state.dto';

export class UpdateProductStockStateDto extends PartialType(
  CreateProductStockStateDto,
) {}
