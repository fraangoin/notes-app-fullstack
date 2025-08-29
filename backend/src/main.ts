import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {

  // Parse origins from env variable separated by commas
  const allowedOrigins = process.env.CORS_ORIGINS?.split(',').map(o => o.trim()) || [];

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      // requests without origin for Postman/curl
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
