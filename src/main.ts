import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://test-front-events.vercel.app',
    methods: 'GET,POST',
    credentials: true,
  });
  await app.listen(8383);
}
bootstrap();
