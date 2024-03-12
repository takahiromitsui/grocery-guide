import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string().max(256, { message: 'Must be 256 or less than 256' }),
  imageURL: z.nullable(
    z.string().max(256, { message: 'Must be 256 or less than 256' }),
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
  userId: z.number(),
});

export const CreateProductSchema = ProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});

export const productsContract = c.router({
  create: {
    method: 'POST',
    path: '/products',
    responses: {
      201: ProductSchema,
    },
    body: CreateProductSchema,
    summary: 'Create a product',
    description: 'Create a product',
  },
});
