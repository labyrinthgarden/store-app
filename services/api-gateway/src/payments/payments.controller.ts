import { Controller, Post, Body, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Controller('payments')
export class PaymentsController {
  private baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {
    this.baseUrl = this.config.get<string>('CART_SERVICE_URL') || 'http://cart-service:3000';
  }

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() body: { amount: number; currency?: string }) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/payments/create-payment-intent`, body),
      );
      return response.data;
    } catch (error) {
      console.error('Error creando PaymentIntent:', error);
      throw error;
    }
  }
}
