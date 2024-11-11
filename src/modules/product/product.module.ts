import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from './schema/product.schema';
import { productCategorySchema } from './schema/product-category.schema';
import { productStockStateSchema } from './schema/product-stock-state.schema';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { ProductCategoryController } from './controllers/product-category.controller';
import { ProductStockStateController } from './controllers/product-stock-state.controller';
import { ProductStockStateService } from './services/product-stock-state.service';
import { Module } from '@nestjs/common';
import { ProductCategoryService } from "./services/product-category.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: productSchema },
      { name: 'ProductCategory', schema: productCategorySchema },
      { name: 'ProductStockState', schema: productStockStateSchema },
    ]),
  ],
  controllers: [
    ProductController,
    ProductStockStateController,
    ProductCategoryController,
  ],
  providers: [ProductService, ProductCategoryService, ProductStockStateService],
  exports: [MongooseModule],
})
export class ProductModule {}
