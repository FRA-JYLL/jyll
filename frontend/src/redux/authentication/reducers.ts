import { GET_USERNAME_AND_ID, AuthenticationActions, AuthenticationState } from './types';

const initialAuthenticationState: AuthenticationState = { userId: null, username: null };

export const authenticationReducer = (
  state = initialAuthenticationState,
  action: AuthenticationActions
) => {
  switch (action.type) {
    case GET_USERNAME_AND_ID:
      return {
        ...state,
        userId: action.payload.userId,
        username: action.payload.username,
      };
    default:
      return state;
  }
};
