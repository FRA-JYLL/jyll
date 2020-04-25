import { LOGIN, User, LoginAction } from './types';

export function login(user: User): LoginAction {
  return { type: LOGIN, payload: user };
}

export type loginType = typeof login;
