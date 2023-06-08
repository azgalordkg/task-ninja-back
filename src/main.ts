import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';
import { AuthService } from './modules/auth/auth.service';
import { UsersService } from './modules/users/users.service';

async function start() {
  const PORT = process.env.PORT || 8008;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://task-ninja-back.herokuapp.com',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const authInitService = app.get(AuthService);
  const usersInitService = app.get(UsersService);

  await usersInitService.createAdminAndUserRoles();
  await authInitService.createAdminUser();

  const config = new DocumentBuilder()
    .setTitle('Task Ninja')
    .setDescription('Task Ninja REST API Documentation')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, '0.0.0.0', () => {
    console.log(`
████████╗░█████╗░░██████╗██╗░░██╗  ███╗░░██╗██╗███╗░░██╗░░░░░██╗░█████╗░
╚══██╔══╝██╔══██╗██╔════╝██║░██╔╝  ████╗░██║██║████╗░██║░░░░░██║██╔══██╗
░░░██║░░░███████║╚█████╗░█████═╝░  ██╔██╗██║██║██╔██╗██║░░░░░██║███████║
░░░██║░░░██╔══██║░╚═══██╗██╔═██╗░  ██║╚████║██║██║╚████║██╗░░██║██╔══██║
░░░██║░░░██║░░██║██████╔╝██║░╚██╗  ██║░╚███║██║██║░╚███║╚█████╔╝██║░░██║
░░░╚═╝░░░╚═╝░░╚═╝╚═════╝░╚═╝░░╚═╝  ╚═╝░░╚══╝╚═╝╚═╝░░╚══╝░╚════╝░╚═╝░░╚═╝

********************************************

------- Server started on port ${PORT} -------
    `);
  });
}

void start();
