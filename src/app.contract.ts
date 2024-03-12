import { initContract } from '@ts-rest/core';
import { LoginSchema } from './users/dto/login.dto';
import { UserResponseSchema } from './users/users.contract';
import { z } from 'zod';

const c = initContract();

export const appContract = c.router({
  login: {
    method: 'POST',
    path: '/login',
    responses: {
      201: UserResponseSchema,
    },
    body: LoginSchema,
    summary: 'Login',
    description: 'Login',
  },
  logout: {
    method: 'POST',
    path: '/logout',
    responses: {
      201: z.object({
        message: z.string(),
      }),
    },
    body: null,
    summary: 'Logout',
    description: 'Logout',
  },
});
