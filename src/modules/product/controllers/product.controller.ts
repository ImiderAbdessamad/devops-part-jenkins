import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { UpdateProductDto } from '../dto/product/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Get('name/:name')
  findByName(@Param('name') name: string) {
    return this.productService.findByName(name);
  }

  @Put('name/:name')
  update(
    @Param('name') name: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(name, updateProductDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.deleteProductById(id);
  }

  @Delete()
  deleteMany(@Body() ids: string[]) {
    return this.productService.deleteManyProductsById(ids);
  }
}
