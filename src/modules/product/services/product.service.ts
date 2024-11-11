import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { Product, ProductDocument } from '../schema/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { Model } from 'mongoose';
import {
  ProductCategory,
  ProductCategoryDocument,
} from '../schema/product-category.schema';
import { ProductStockState } from '../schema/product-stock-state.schema';
import { UpdateProductDto } from '../dto/product/update-product.dto';
import {
  generateErrorResponse,
  generateSuccessResponse,
} from 'src/utils/response.util';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(ProductCategory.name)
    private productCategoryModel: Model<ProductCategoryDocument>,
    @InjectModel(ProductStockState.name)
    private productStockStateModel: Model<ProductStockState>,
  ) {}


  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ApiResponse<Product>> {
    const existingProduct = await this.productModel.findOne({
      name: createProductDto.name,
    });

    if (existingProduct) {
      return generateErrorResponse('Product already exists');
    }

    const productCategory = await this.productCategoryModel.findOne({
      name: createProductDto.productCategoryName,
    });

    if (createProductDto.productCategoryName && !productCategory) {
      return generateErrorResponse('productCategory not found');
    }

    const productStockState = await this.productStockStateModel.findOne({
      name: createProductDto.productStockStateName,
    });

    if (createProductDto.productStockStateName && !productStockState) {
      return generateErrorResponse('productStockState not found');
    }

    const product = new this.productModel(createProductDto);
    await product.save();

      return generateSuccessResponse(
        product.toObject(),
        'Product created successfully',
      );

  }

  async findAll(): Promise<ApiResponse<Product[]>> {
    const products = await this.productModel.find().exec();
    return generateSuccessResponse(
      products.map((product) => product.toObject()),
      'Products found successfully',
    );
  }

  async findById(id: string): Promise<ApiResponse<Product>> {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      return generateErrorResponse('Product not found');
    }

    return generateSuccessResponse(
      product.toObject(),
      'Product found successfully',
    );
  }

  async findByName(name: string): Promise<ApiResponse<Product>> {
    const product = await this.productModel.findOne({ name }).exec();

    if (!product) {
      return generateErrorResponse('Product not found');
    }

    return generateSuccessResponse(
      product.toObject(),
      'Product found successfully',
    );
  }


  async updateProduct(
    name: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ApiResponse<Product>> {
    const existingProduct = await this.productModel.findOne({
      name,
    });

    if (!existingProduct) {
      return generateErrorResponse('Product not found');
    }

    const productCategory = await this.productCategoryModel.findOne({
      name: updateProductDto.productCategoryName,
    });

    if (!productCategory) {
      return generateErrorResponse('productCategory not found');
    }

    const productStockState = await this.productStockStateModel.findOne({
      name: updateProductDto.productStockStateName,
    });

    if (!productStockState) {
      return generateErrorResponse('productStockState not found');
    }

    existingProduct.set(updateProductDto);
    await existingProduct.save();

    return generateSuccessResponse(
      existingProduct.toObject(),
      'Product updated successfully',
    );
  }

  async deleteProductById(id: string): Promise<ApiResponse<Product>> {
    const product = await this.productModel.findById({
      id,
    });

    if (!product) {
      return generateErrorResponse('Product not found');
    }

    await this.productModel.findByIdAndDelete(id);

    return generateSuccessResponse(null, 'Product deleted successfully');
  }

  async deleteManyProductsById(ids: string[]): Promise<ApiResponse<void>> {
    const products = await this.productModel.find({ _id: { $in: ids } });

    if (!products && products.length === 0) {
      return generateErrorResponse('Products not found');
    }

    await this.productModel.deleteMany({ _id: { $in: ids } });

    return generateSuccessResponse(null, 'Products deleted successfully');
  }


}
