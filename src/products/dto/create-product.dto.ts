import { z } from 'zod';
import { CreateProductSchema } from '../products.contract';

export type CreateProductDto = z.infer<typeof CreateProductSchema>;
