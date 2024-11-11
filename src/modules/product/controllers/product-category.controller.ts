import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductCategoryService } from '../services/product-category.service';
import { CreateProductCategoryDto } from '../dto/product-category/create-product-category.dto';
import { UpdateProductCategoryDto } from '../dto/product-category/update-product-category.dto';

@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post()
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryService.createProductCategory(
      createProductCategoryDto,
    );
  }

  @Get()
  findAll() {
    return this.productCategoryService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productCategoryService.findById(id);
  }

  @Get('name/:name')
  findByName(@Param('name') name: string) {
    return this.productCategoryService.findByName(name);
  }

  @Put('name/:name')
  update(
    @Param('name') name: string,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    return this.productCategoryService.updateProductCategory(
      name,
      updateProductCategoryDto,
    );
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productCategoryService.deleteProductCategoryById(id);
  }

  @Delete()
  deleteMany(@Body() ids: string[]) {
    return this.productCategoryService.deleteManyProductCategoriesById(ids);
  }
}
