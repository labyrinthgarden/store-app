import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [PaymentsController],
})
export class PaymentsModule {}