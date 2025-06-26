import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Enxero Platform Backend API')
      .setDescription(
        'Comprehensive API documentation for the Enxero Platform Backend, including Authentication, User Management, Company Management, Employee Management, Payroll Management, Leave Management, Forms Management, File Management, Notifications, Audit Logging, Integrations, and System Configuration.',
      )
      .setVersion('1.0.0')
      .setContact(
        'Enxero Support',
        'https://www.enxero.com/support',
        'support@enxero.com',
      )
      .addServer('http://localhost:3100', 'Development Server')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter the JWT token in the format "Bearer <token>"',
        },
        'bearerAuth',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(process.env.PORT ?? 3100);
}
bootstrap();
