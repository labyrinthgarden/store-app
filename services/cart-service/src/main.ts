import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', // Vite
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Cart Service running on http://localhost:${port}`);
}
bootstrap();
