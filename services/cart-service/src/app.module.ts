// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentsModule } from './payments/payments.module';

@Module({
 imports: [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  PaymentsModule,
],
providers: []
})
export class AppModule {}
