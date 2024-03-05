import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '../contract';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @TsRestHandler(contract)
  async handler() {
    return tsRestHandler(contract, {
      create: async ({ body }) => {
        const user = await this.usersService.create(body);
        if (!user) {
          return { status: 404, body: null };
        }
        return { status: 200, body: user };
      },
    });
  }
  // @Post()
  // async create(@Body() createUserDto: CreateUserDto) {
  //   return await this.usersService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':username')
  // async findOne(@Param('username') username: string) {
  //   return await this.usersService.findOne(username);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
