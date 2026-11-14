import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AuditInterceptor } from './audit/audit.interceptor';
import { AuditService } from './audit/audit.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  
  // 1. Untuk menyembunyikan password
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); 
  
  // 2. Untuk mencatat Audit Log otomatis (BARIS INI YANG KURANG)
  app.useGlobalInterceptors(new AuditInterceptor(app.get(AuditService)));

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('KSDAS API')
    .setDescription('API Documentation for KSDAS Backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log('🚀 Backend berjalan di: http://localhost:3000/api/docs');
}
bootstrap();