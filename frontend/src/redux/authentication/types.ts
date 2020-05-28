export const GET_USERNAME_AND_ID = 'GET_USERNAME_AND_ID';

export interface User {
  userId: number;
  username: string;
}

export type AuthenticationActions = GetUsernameAndIdAction; // Add more with the | operator

export interface GetUsernameAndIdAction {
  type: typeof GET_USERNAME_AND_ID;
  payload: User;
}

export interface AuthenticationState {
  userId: number | null;
  username: string | null;
}
