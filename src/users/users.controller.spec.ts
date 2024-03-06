import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  const users: User[] = [
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
  const mockUserService = {
    create: jest.fn((dto) => {
      return {
        id: Math.random(),
        username: dto.username,
        email: dto.email,
      };
    }),
    findOne: jest.fn(async (username) => {
      const user = users.find((user) => user.username === username);
      if (!user) {
        return null;
      }
      return user;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  // it('should create a user', () => {
  //   expect(
  //     controller.handler({
  //       email: 'example@mail.com',
  //       username: 'example',
  //       password: 'password',
  //     }),
  //   ).toEqual({
  //     id: expect.any(Number),
  //     email: 'example@mail.com',
  //     username: 'example',
  //   });
  // });
  // it('should return one item', async () => {
  //   expect(await controller.findOne('janedoe')).toEqual({
  //     id: 1,
  //     email: 'janedoe@mail.com',
  //     username: 'janedoe',
  //     password: 'password',
  //   });
  // });
});
