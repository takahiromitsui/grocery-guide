import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { generateOpenApi } from '@ts-rest/open-api';
import { contract } from './contract';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as dotenv from 'dotenv';
import * as pgSimple from 'connect-pg-simple';
import { Pool } from 'pg';

dotenv.config();
const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const pgSession = pgSimple(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const maxAge = 1000 * 60 * 60 * 10; // 10h
  app.use(
    //save the session on the database
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: maxAge },
      store: new pgSession({
        pool: pgPool,
        tableName: 'sessions',
      }),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // const config = new DocumentBuilder()
  //   .setTitle('TODO API')
  //   .setDescription('The rest API for TODOs')
  //   .setVersion('1.0')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  const document = generateOpenApi(contract, {
    info: {
      title: 'Husband grocery guide',
      version: '1.0.0',
    },
  });
  SwaggerModule.setup('/', app, document);
  await app.listen(3000);
}
bootstrap();
