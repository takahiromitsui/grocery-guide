import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return a new user info', () => {
    const user = {
      email: 'example@mail.com',
      username: 'example',
      password: 'password',
    };

    const createdUser = service.create(user);

    expect(createdUser).toHaveProperty('id');
    expect(createdUser).not.toHaveProperty('password');
    expect(createdUser).toHaveProperty('email', 'example@mail.com');
  });
});
