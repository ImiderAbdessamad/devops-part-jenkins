import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductStockStateDocument = ProductStockState & Document;

@Schema({ timestamps: true })
export class ProductStockState {
  @Prop()
  name: string;

  @Prop()
  libelle: string;
}

export const productStockStateSchema =
  SchemaFactory.createForClass(ProductStockState);
