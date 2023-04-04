import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { utilsSwagger } from './utils/constants';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(utilsSwagger.title)
    .setDescription(utilsSwagger.description)
    .setVersion(utilsSwagger.version)
    .addTag(utilsSwagger.tag)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
