import {
  GET_USER_INFO_SUCCESS,
  AuthenticationActions,
  AuthenticationState,
  GET_TOKENS_SUCCESS,
} from './types';

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
    case GET_TOKENS_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    default:
      return state;
  }
};
