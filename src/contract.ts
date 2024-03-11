import { initContract } from '@ts-rest/core';
import { usersContract } from './users/users.contract';

const c = initContract();

export const contract = c.router({
  users: usersContract,
});
