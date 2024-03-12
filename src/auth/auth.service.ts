import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { LoginDto } from '../users/dto/login.dto';
import { db } from 'db/db';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { users } from 'db/schema';

@Injectable()
export class AuthService {
  // constructor(private userService: UsersService) {}
  logger = new Logger();
  async login(loginDto: LoginDto) {
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.email, loginDto.email),
      });
      if (!user) {
        this.logger.error('user not found');
        throw new Error('Failed to login');
      }
      const match = await bcrypt.compare(loginDto.password, user.password);
      if (!match) {
        this.logger.error('wrong password');
        return null;
      }
      const { password, email, ...rest } = user;
      this.logger.log('user successfully login');
      return rest;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to login user');
    }
  }
}
