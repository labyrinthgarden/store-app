// src/payments/payments.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(private readonly config: ConfigService) {
    const secretKey = this.config.get<string>('STRIPE_SECRET_KEY');
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY no configurada en .env');
    }

    this.stripe = new Stripe(secretKey, {
      apiVersion: '2025-08-27.basil',
    });
  }

  async createPaymentIntent(amount: number, currency = 'usd') {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
        payment_method_types: ['card'],
      });

      return { clientSecret: paymentIntent.client_secret };
    } catch (err) {
      console.error('Error creando PaymentIntent:', err);
      throw new InternalServerErrorException('No se pudo crear el PaymentIntent');
    }
  }
}
