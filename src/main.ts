import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle(`Zed Stores ${process.env.ENVIRONMENT} Platform`)
    .setDescription('Built by Malz Studios')
    .setVersion('1.0')
    .addBearerAuth()
    .setContact(
      'Malz Studios',
      'https://charlesmalama.com',
      'malamacharlesmc@gmail.com',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
