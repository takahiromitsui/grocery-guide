// contract.ts

import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Must be 8 or more characters long' }),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UserResponseSchema = UserSchema.omit({
  email: true,
  password: true,
});

export const contract = c.router({
  create: {
    method: 'POST',
    path: '/users',
    responses: {
      201: UserResponseSchema,
    },
    body: CreateUserSchema,
    summary: 'Create a user',
    description: 'Create a user',
  },
});
