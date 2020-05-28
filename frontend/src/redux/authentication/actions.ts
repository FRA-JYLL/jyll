import { GET_USERNAME_AND_ID, User, GetUsernameAndIdAction } from './types';

export function getUsernameAndId(user: User): GetUsernameAndIdAction {
  return { type: GET_USERNAME_AND_ID, payload: user };
}

export type getUsernameAndIdType = typeof getUsernameAndId;
