import { LOGIN, LoginAction, LoginState } from './types';

const initialState: LoginState = { userId: null, username: null };

export const loginReducer = (state = initialState, action: LoginAction) => {
  switch (action.type) {
    case LOGIN:
      return { ...action.payload };
    default:
      return state;
  }
};
