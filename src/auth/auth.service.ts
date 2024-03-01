import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(loginDto: LoginDto) {
    const user = await this.userService.findOne(loginDto.username);

    if (user && user.password === loginDto.password) {
      const { password, username, ...rest } = user;
      return rest;
    }
    return null;
  }
}
