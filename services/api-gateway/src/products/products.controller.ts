import { Controller, Get, Param, Query } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  async findAll() {
    try {
      const response = await firstValueFrom(
        this.httpService.get('http://product-service:3000/products')
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return { error: 'Cannot fetch products', details: error.message };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`http://product-service:3000/products/${id}`)
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      return { error: 'Cannot fetch product', details: error.message };
    }
  }
}
