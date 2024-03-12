import { Controller, UseGuards, Request, Logger } from '@nestjs/common';
import { ProductsService } from './products.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { productsContract } from './products.contract';
import { AuthenticatedGuard } from '../auth/authenticated.guard';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  private readonly logger = new Logger();
  @TsRestHandler(productsContract)
  @UseGuards(AuthenticatedGuard)
  async handler(@Request() req) {
    return tsRestHandler(productsContract, {
      create: async ({ body }) => {
        const sessionData = req.session;
        const userId = sessionData?.passport?.user?.id;
        const product = await this.productsService.create(userId, body);
        if (!product) {
          return { status: 404, body: null };
        }
        return { status: 200, body: product };
      },
    });
  }
}
