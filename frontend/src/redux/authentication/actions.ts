import { GET_USER_INFO_REQUEST, GetUserInfoRequest } from './types';

export function getUserInfoActionCreator(): GetUserInfoRequest {
  return { type: GET_USER_INFO_REQUEST };
}

export type GetUserInfoActionCreator = typeof getUserInfoActionCreator;
