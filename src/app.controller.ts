import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { appContract } from './app.contract';
import { UsersService } from './users/users.service';
import { AuthenticatedGuard } from './auth/authenticated.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService,
  ) {}
  logger = new Logger();
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
  @TsRestHandler(appContract.logout)
  @UseGuards(AuthenticatedGuard)
  async logout(@Request() req) {
    return tsRestHandler(appContract.logout, async () => {
      try {
        req.session.destroy();
        this.logger.log('logout successful');
        return { status: 200, body: { message: 'logout successful' } };
      } catch (error) {
        this.logger.error(error);
        throw new InternalServerErrorException(
          'Failed to logout. Please try again later.',
        );
      }
    });
  }
}
