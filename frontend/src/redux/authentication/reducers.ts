import { GET_USER_INFO_SUCCESS, AuthenticationActions, AuthenticationState } from './types';

export const authenticationReducer = (
  state: AuthenticationState = {},
  action: AuthenticationActions
) => {
  switch (action.type) {
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        userId: action.payload.userId,
        username: action.payload.username,
        lastLogin: action.payload.lastLogin,
      };
    default:
      return state;
  }
};
