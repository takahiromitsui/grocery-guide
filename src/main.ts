import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const maxAge = 1000 * 60 * 60 * 10; // 10h
  app.use(
    //save the session on the database
    session({
      secret: 'keyboard cat', // use env for production
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: maxAge },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const config = new DocumentBuilder()
    .setTitle('TODO API')
    .setDescription('The rest API for TODOs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  await app.listen(3000);
}
bootstrap();
