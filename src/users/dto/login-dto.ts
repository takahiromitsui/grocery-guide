import { z } from 'zod';
import { UserSchema } from '../users.contract';

export const LoginSchema = UserSchema.omit({
  id: true,
  username: true,
  createdAt: true,
  updatedAt: true,
});

export type LoginDto = z.infer<typeof LoginSchema>;
