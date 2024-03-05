import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { db } from 'db/db';
import { users } from 'db/schema';

@Injectable()
export class UsersService {
  private logger = new Logger();
  async create(createUserDto: CreateUserDto) {
    try {
      const data = await db
        .insert(users)
        .values({
          username: createUserDto.username,
          email: createUserDto.email,
          password: createUserDto.password,
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
