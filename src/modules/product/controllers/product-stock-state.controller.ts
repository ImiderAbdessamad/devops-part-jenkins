import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductStockStateService } from '../services/product-stock-state.service';
import { CreateProductStockStateDto } from '../dto/product-stock-state/create-product-stock-state.dto';
import { UpdateProductStockStateDto } from '../dto/product-stock-state/update-product-stock-state.dto';

@Controller('product-stock-state')
export class ProductStockStateController {
  constructor(private productStockStateService: ProductStockStateService) {}

  @Post()
  async createProductStockState(
    @Body() createProductStockStateDto: CreateProductStockStateDto,
  ) {
    return this.productStockStateService.createProductStockState(
      createProductStockStateDto,
    );
  }

  @Get()
  async findAll() {
    return this.productStockStateService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.productStockStateService.findById(id);
  }

  @Get('name/:name')
  async findByName(@Param('name') name: string) {
    return this.productStockStateService.findByName(name);
  }

  @Put('name/:name')
  async updateProductStockState(
    @Param('name') name: string,
    @Body() updateProductStockStateDto: UpdateProductStockStateDto,
  ) {
    return this.productStockStateService.updateProductStockState(
      name,
      updateProductStockStateDto,
    );
  }

  @Delete(':id')
  async deleteProductStockState(@Param('id') id: string) {
    return this.productStockStateService.deleteProductStockStateById(id);
  }

  @Delete()
  async deleteAllProductStockStates(@Body() ids: string[]) {
    return this.productStockStateService.deleteManyProductStockStatesById(ids);
  }
}
