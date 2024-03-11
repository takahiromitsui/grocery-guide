import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { appContract } from './app.contract';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService,
  ) {}

  @TsRestHandler(appContract.login)
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return tsRestHandler(appContract.login, async () => {
      const { user } = req;
      //   const user = await this.userService.login(body);
      if (!user) {
        return { status: 404, body: null };
      }
      return { status: 200, body: user };
    });
  }
}
