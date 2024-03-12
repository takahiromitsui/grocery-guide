import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { db } from 'db/db';
import { and, eq } from 'drizzle-orm';
import { products, users } from 'db/schema';

@Injectable()
export class ProductsService {
  logger = new Logger();

  async create(userId: number, createProductDto: CreateProductDto) {
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
      });
      if (!user) {
        this.logger.error('user not exists');
        throw new Error('Failed to create product');
      }
      const product = await this.findProductByName(
        userId,
        createProductDto.name,
      );
      if (product) {
        this.logger.error('user already has the product');
        throw new Error('Product must have an unique name');
      }
      const data = await db
        .insert(products)
        .values({
          name: createProductDto.name,
          imageURL: createProductDto.imageURL,
          userId: user.id,
        })
        .returning({
          id: products.id,
          name: products.name,
          userId: products.userId,
          createdAt: products.createdAt,
          updatedAt: products.updatedAt,
        });
      if (!data.length) {
        this.logger.error('callback is empty array');
        throw new Error('Failed to create product');
      }
      this.logger.log('Product created');
      return data[0];
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to create product');
    }
  }
  async findProductByName(userId: number, name: string) {
    const product = await db.query.products.findFirst({
      where: and(eq(products.userId, userId), eq(products.name, name)),
    });
    return product;
  }
}
