import { z } from 'zod';
import { CreateUserSchema } from '../users.contract';

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
