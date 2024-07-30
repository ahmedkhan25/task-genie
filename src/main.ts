import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 
// Serve static files for Swagger UI 
  app.use('/public', express.static(join(__dirname, '..', 'public')));
  const config = new DocumentBuilder()
  .setTitle('taskGenie AI POC - Skills API')
  .setDescription('  API description')
  .setVersion('0.1')
  .addTag('skills')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
