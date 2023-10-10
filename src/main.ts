import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port: number = configService.get<number>('APP_PORT');

  // global prefix
  app.setGlobalPrefix('api/v1');
  app.use(helmet());
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: true, limit: '1mb' }));
  app.use(cookieParser());

  if (process.env.NODE_ENV === 'development') {
    app.enableCors({
      allowedHeaders: '*',
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    const swaggerConfig = new DocumentBuilder()
      .setTitle(configService.get<string>('APP_NAME'))
      .setDescription(configService.get<string>('APP_DESCRIPTION'))
      .setVersion(configService.get<string>('APP_VERSION'))
      .addBearerAuth()
      .build();

    const customOptions: SwaggerCustomOptions = {
      swaggerOptions: {
        persistAuthorization: true,
      },
      customSiteTitle: configService.get<string>('APP_DESCRIPTION'),
    };

    const document = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('api', app, document, customOptions);
  }

  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
  });

  await app.listen(port);
}
bootstrap();
