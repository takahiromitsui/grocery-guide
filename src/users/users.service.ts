import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { db } from 'db/db';
import { users } from 'db/schema';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-dto';

@Injectable()
export class UsersService {
  logger = new Logger();
  saltOrRounds = 10;
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.email, createUserDto.email),
      });
      if (user) {
        this.logger.error('user already exists');
        throw new Error('Failed to create user');
      }
      const hash = await bcrypt.hash(createUserDto.password, this.saltOrRounds);
      const data = await db
        .insert(users)
        .values({
          username: createUserDto.username,
          email: createUserDto.email,
          password: hash,
        })
        .returning({
          id: users.id,
          username: users.username,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        });
      if (!data.length) {
        this.logger.error('callback is empty array');
        throw new Error('Failed to create user');
      }
      this.logger.log('User created');
      return data[0];
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  // async findOne(username: string) {
  //   const user = this.users.find((user) => user.username === username);

  //   if (!user) {
  //     return null;
  //   }
  //   return user;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
