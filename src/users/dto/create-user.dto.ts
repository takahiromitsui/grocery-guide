import { z } from 'zod';
import { CreateUserSchema } from '../../contract';

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
