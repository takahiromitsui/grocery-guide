import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      email: 'janedoe@mail.com',
      username: 'janedoe',
      password: 'password',
    },
    {
      id: 2,
      email: 'james@mail.com',
      username: 'jamesdoe',
      password: 'password',
    },
  ];
  create(createUserDto: CreateUserDto) {
    const user = {
      id: Math.random(),
      ...createUserDto,
    };
    this.users.push(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    return rest;
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
