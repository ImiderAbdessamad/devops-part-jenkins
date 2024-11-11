import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/config.service';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionsFilter } from './common/filters/exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new ExceptionsFilter());

  const appConfigService = app.get(AppConfigService);

  app.setGlobalPrefix(appConfigService.apiPrefix);

  await app.listen(appConfigService.port);

  console.log(
    `Application is running on: ${appConfigService.baseUrl}:${appConfigService.port}`,
  );
}
bootstrap();
