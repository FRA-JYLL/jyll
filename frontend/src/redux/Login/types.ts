export const LOGIN = 'LOGIN';

export interface User {
  userId: number;
  username: string;
}

export interface LoginAction {
  type: typeof LOGIN;
  payload: User;
}

export interface LoginState {
  userId: number | null;
  username: string | null;
}
