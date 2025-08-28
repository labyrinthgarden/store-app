// src/payments/payments.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() body: CreatePaymentIntentDto) {
    const { amount, currency } = body;
    return this.paymentsService.createPaymentIntent(amount, currency ?? 'usd');
  }
}
