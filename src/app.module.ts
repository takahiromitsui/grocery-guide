import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DrizzleModule } from './drizzle/drizzle.module';

@Module({
  imports: [UsersModule, AuthModule, DrizzleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
