export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const GET_TOKENS_SUCCESS = 'GET_TOKENS_SUCCESS';
export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export type AuthenticationActions = GetUserInfoSuccess | LogoutSuccess | GetTokensSuccess;

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

export interface GetTokensSuccess {
  type: typeof GET_TOKENS_SUCCESS;
  payload: {
    accessToken: string;
    refreshToken: string;
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

export interface LogoutSuccess {
  type: typeof LOGOUT_SUCCESS;
}

export interface AuthenticationState {
  userId?: number;
  username?: string;
  lastLogin?: string;
  accessToken?: string;
  refreshToken?: string;
}
