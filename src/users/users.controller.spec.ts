import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  const mockUserService = {
    create: jest.fn((dto) => {
      return {
        id: Math.random(),
        username: dto.username,
        email: dto.email,
      };
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
  it('should create a user', () => {
    expect(
      controller.create({
        email: 'example@mail.com',
        username: 'example',
        password: 'password',
      }),
    ).toEqual({
      id: expect.any(Number),
      email: 'example@mail.com',
      username: 'example',
    });
  });
});
