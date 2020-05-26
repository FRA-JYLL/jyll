import { LOGIN, User, LoginAction } from './types';

// TODO: Remove or reuse when fetching credentials in Home page
export function login(user: User): LoginAction {
  return { type: LOGIN, payload: user };
}

export type loginType = typeof login;
