import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ProductsController } from './products/products.controller';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    PaymentsModule],
  controllers: [ProductsController],
})
export class AppModule {}
