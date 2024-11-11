import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import {
  generateErrorResponse,
  generateSuccessResponse,
} from 'src/utils/response.util';
import { CreateProductCategoryDto } from '../dto/product-category/create-product-category.dto';
import { UpdateProductCategoryDto } from '../dto/product-category/update-product-category.dto';
import {
  ProductCategory,
  ProductCategoryDocument,
} from '../schema/product-category.schema';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectModel(ProductCategory.name)
    private productCategoryModel: Model<ProductCategoryDocument>,
  ) {}

  async createProductCategory(
    createProductCategoryDto: CreateProductCategoryDto,
  ): Promise<ApiResponse<ProductCategory>> {
    const existingProductCategory = await this.productCategoryModel.findOne({
      name: createProductCategoryDto.name,
    });

    if (existingProductCategory) {
      return generateErrorResponse('Product Category already exists');
    }

    const productCategory = new this.productCategoryModel(
      createProductCategoryDto,
    );
    await productCategory.save();
    return generateSuccessResponse(
      productCategory.toObject(),
      'Product Category created successfully',
    );
  }

  async findAll(): Promise<ApiResponse<ProductCategory[]>> {
    const productCategories = await this.productCategoryModel.find().exec();
    return generateSuccessResponse(
      productCategories,
      'Product Categories fetched successfully',
    );
  }

  async findById(id: string): Promise<ApiResponse<ProductCategory>> {
    const productCategory = await this.productCategoryModel.findById(id).exec();
    if (!productCategory) {
      return generateErrorResponse('Product Category not found');
    }

    return generateSuccessResponse(
      productCategory.toObject(),
      'Product Category fetched successfully',
    );
  }

  async findByName(name: string): Promise<ApiResponse<ProductCategory>> {
    const productCategory = await this.productCategoryModel
      .findOne({ name })
      .exec();
    if (!productCategory) {
      return generateErrorResponse('Product Category not found');
    }

    return generateSuccessResponse(
      productCategory.toObject(),
      'Product Category fetched successfully',
    );
  }

  async updateProductCategory(
    name: string,
    updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    const existingProductCategory = await this.productCategoryModel.findOne({
      name,
    });

    if (!existingProductCategory) {
      return generateErrorResponse('Product Category not found');
    }

    existingProductCategory.set(updateProductCategoryDto);
    await existingProductCategory.save();

    return generateSuccessResponse(
      existingProductCategory.toObject(),
      'Product Category updated successfully',
    );
  }

  async deleteProductCategoryById(id: string): Promise<ApiResponse<void>> {
    const productCategory = await this.productCategoryModel
      .findByIdAndDelete(id)
      .exec();

    if (!productCategory) {
      return {
        success: false,
        message: 'Product Category not found',
      };
    }

    return generateSuccessResponse(
      null,
      'Product Category deleted successfully',
    );
  }

  async deleteManyProductCategoriesById(
    ids: string[],
  ): Promise<ApiResponse<void>> {
    const productCategories = await this.productCategoryModel.deleteMany({
      _id: { $in: ids },
    });

    if (productCategories.deletedCount === 0) {
      return generateErrorResponse('Product Categories not found');
    }

    return generateSuccessResponse(
      null,
      'Product Categories deleted successfully',
    );
  }
}
