import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { ApiBody } from '@nestjs/swagger';
import { AuthenticatedGuard } from './auth/authenticated.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'john_doe',
        },
        password: {
          type: 'string',
          example: 'password123',
        },
      },
      required: ['username', 'password'],
    },
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return { msg: 'logged in' };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  getHello(): string {
    return this.appService.getHello();
  }
}
