import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin: [
      'http://localhost:4200',
      'http://ads-admin-nestjs.s3-website.us-east-2.amazonaws.com',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  app.use(helmet());
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
