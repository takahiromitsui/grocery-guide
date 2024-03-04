import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;

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
      providers: [AuthService, UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should login successfully with correct username and password', async () => {
    const user = {
      username: 'janedoe',
      password: 'password',
    };

    const loginUser = await service.validateUser(user.username, user.password);
    expect(loginUser).toEqual({
      id: 1,
      email: 'janedoe@mail.com',
    });
  });
  it('should fail to login with incorrect username', async () => {
    const user = {
      username: 'random',
      password: 'password',
    };

    const loginUser = await service.validateUser(user.username, user.password);
    expect(loginUser).toBeNull();
  });
  it('should fail to login with incorrect username and password', async () => {
    const user = {
      username: 'janedoe',
      password: 'random',
    };

    const loginUser = await service.validateUser(user.username, user.password);
    expect(loginUser).toBeNull();
  });
});
