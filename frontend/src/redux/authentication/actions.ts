import {
  GetUserInfoRequest,
  GET_USER_INFO_REQUEST,
  SignupRequest,
  SIGNUP_REQUEST,
  LoginRequest,
  LOGIN_REQUEST,
} from './types';

export const signupActionCreator = (username: string, password: string): SignupRequest => ({
  type: SIGNUP_REQUEST,
  payload: { username, password },
});

export const loginActionCreator = (username: string, password: string): LoginRequest => ({
  type: LOGIN_REQUEST,
  payload: { username, password },
});

export const getUserInfoActionCreator = (): GetUserInfoRequest => ({ type: GET_USER_INFO_REQUEST });

export type SignupActionCreator = typeof signupActionCreator;
export type LoginActionCreator = typeof loginActionCreator;
export type GetUserInfoActionCreator = typeof getUserInfoActionCreator;
