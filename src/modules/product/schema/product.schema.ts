import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ProductCategory } from './product-category.schema';
import { ProductStockState } from './product-stock-state.schema';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  costPrice: number;

  @Prop()
  sku: string;

  @Prop()
  stockedQuantity: number;

  @Prop({ type: Types.ObjectId, ref: 'ProductCategory' })
  productCategory: ProductCategory | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'ProductStockState' })
  productStockState: ProductStockState | Types.ObjectId;
}

export const productSchema = SchemaFactory.createForClass(Product);
