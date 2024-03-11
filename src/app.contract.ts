import { initContract } from '@ts-rest/core';
import { LoginSchema } from './users/dto/login-dto';
import { UserResponseSchema } from './users/users.contract';

const c = initContract();

export const appContract = c.router({
  login: {
    method: 'POST',
    path: '/',
    responses: {
      201: UserResponseSchema,
    },
    body: LoginSchema,
    summary: 'Login',
    description: 'Login',
  },
});
