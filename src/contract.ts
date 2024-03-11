import { initContract } from '@ts-rest/core';
import { usersContract } from './users/users.contract';
import { appContract } from './app.contract';

const c = initContract();

export const contract = c.router({
  app: appContract,
  users: usersContract,
});
