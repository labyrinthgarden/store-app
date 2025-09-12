import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';

@Controller('products')
export class ProductsController {
  private readonly productServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.productServiceUrl = this.configService.get('PRODUCT_SERVICE_URL') || 'http://default-url';
  }

  @Get()
  async findAll() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.productServiceUrl}/products`, {
          timeout: 5000, // Timeout de 5 segundos
        })
      );
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error fetching products');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.productServiceUrl}/products/${id}`, {
          timeout: 5000,
        })
      );
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error fetching product');
    }
  }

  // Nuevos endpoints para categorías y ofertas
  @Get('category/:category')
  async findByCategory(@Param('category') category: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.productServiceUrl}/products/category/${category}`, {
          timeout: 5000,
        })
      );
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error fetching products by category');
    }
  }

  @Get('offers/discounted')
  async findDiscounted() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.productServiceUrl}/products/offers`, {
          timeout: 5000,
        })
      );
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error fetching discounted products');
    }
  }

  private handleError(error: AxiosError, defaultMessage: string) {
    if (error.response) {
      // El servidor respondió con un código de error
      throw new HttpException(
        {
          message: defaultMessage,
          details: error.response.data,
          statusCode: error.response.status,
        },
        error.response.status
      );
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      throw new HttpException(
        {
          message: 'Product service is unavailable',
          details: 'The request was made but no response was received',
        },
        HttpStatus.SERVICE_UNAVAILABLE
      );
    } else {
      // Error al configurar la petición
      throw new HttpException(
        {
          message: 'Internal error',
          details: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
