import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ProductStockState,
  ProductStockStateDocument,
} from '../schema/product-stock-state.schema';
import { Model } from 'mongoose';
import { CreateProductStockStateDto } from '../dto/product-stock-state/create-product-stock-state.dto';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { UpdateProductStockStateDto } from '../dto/product-stock-state/update-product-stock-state.dto';
import {
  generateErrorResponse,
  generateSuccessResponse,
} from 'src/utils/response.util';

@Injectable()
export class ProductStockStateService {
  constructor(
    @InjectModel(ProductStockState.name)
    private productStockStateModel: Model<ProductStockStateDocument>,
  ) {}

  async createProductStockState(
    createProductStockStateDto: CreateProductStockStateDto,
  ): Promise<ApiResponse<ProductStockState>> {
    const existingProductStockState = await this.productStockStateModel.findOne(
      {
        name: createProductStockStateDto.name,
      },
    );

    if (existingProductStockState) {
      return generateErrorResponse('Product stock state already exists');
    }

    const productStockState = new this.productStockStateModel(
      createProductStockStateDto,
    );
    await productStockState.save();
    return generateSuccessResponse(
      productStockState.toObject(),
      'Product stock state created successfully',
    );
  }

  async findAll(): Promise<ApiResponse<ProductStockState[]>> {
    const productStockStates = await this.productStockStateModel.find().exec();
    return generateSuccessResponse(
      productStockStates.map((productStockState) =>
        productStockState.toObject(),
      ),
      'Product stock states found successfully',
    );
  }

  async findById(id: string): Promise<ApiResponse<ProductStockState>> {
    const productStockState = await this.productStockStateModel.findById(id);

    if (!productStockState) {
      return generateErrorResponse('Product stock state not found');
    }

    return generateSuccessResponse(
      productStockState.toObject(),
      'Product stock state found successfully',
    );
  }

  async findByName(name: string): Promise<ApiResponse<ProductStockState>> {
    const productStockState = await this.productStockStateModel
      .findOne({ name })
      .exec();

    if (!productStockState) {
      return generateErrorResponse('Product stock state not found');
    }

    return generateSuccessResponse(
      productStockState.toObject(),
      'Product stock state found successfully',
    );
  }

  async updateProductStockState(
    name: string,
    updateProductStockStateDto: UpdateProductStockStateDto,
  ): Promise<ApiResponse<ProductStockState>> {
    const existingProductStockState = await this.productStockStateModel.findOne(
      {
        name,
      },
    );

    if (!existingProductStockState) {
      return generateErrorResponse('Product stock state not found');
    }

    existingProductStockState.set(updateProductStockStateDto);
    await existingProductStockState.save();

    return generateSuccessResponse(
      existingProductStockState.toObject(),
      'Product stock state updated successfully',
    );
  }

  async deleteProductStockStateById(
    id: string,
  ): Promise<ApiResponse<ProductStockState>> {
    const productStockState = await this.productStockStateModel
      .findByIdAndDelete(id)
      .exec();

    if (!productStockState) {
      return generateErrorResponse('Product stock state not found');
    }

    return generateSuccessResponse(
      null,
      'Product stock state deleted successfully',
    );
  }

  async deleteManyProductStockStatesById(
    ids: string[],
  ): Promise<ApiResponse<void>> {
    const productStockStates = await this.productStockStateModel.deleteMany({
      _id: { $in: ids },
    });

    if (productStockStates.deletedCount === 0) {
      return generateErrorResponse('Product stock states not found');
    }

    return generateSuccessResponse(
      null,
      'Product stock states deleted successfully',
    );
  }
}
