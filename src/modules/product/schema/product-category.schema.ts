import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductCategoryDocument = ProductCategory & Document;

@Schema({ timestamps: true })
export class ProductCategory {
  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const productCategorySchema =
  SchemaFactory.createForClass(ProductCategory);
