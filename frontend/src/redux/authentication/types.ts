export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';

export type AuthenticationActions = GetUserInfoSuccess; // Add more with the | operator

export interface SignupRequest {
  type: typeof SIGNUP_REQUEST;
  payload: {
    username: string;
    password: string;
  };
}

export interface LoginRequest {
  type: typeof LOGIN_REQUEST;
  payload: {
    username: string;
    password: string;
  };
}

export interface GetUserInfoRequest {
  type: typeof GET_USER_INFO_REQUEST;
}

export interface GetUserInfoSuccess {
  type: typeof GET_USER_INFO_SUCCESS;
  payload: {
    userId: number;
    username: string;
    lastLogin: string;
  };
}

export interface AuthenticationState {
  userId?: number;
  username?: string;
  lastLogin?: string;
}
