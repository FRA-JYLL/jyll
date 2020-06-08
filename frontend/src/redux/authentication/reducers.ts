import {
  GET_USER_INFO_SUCCESS,
  AuthenticationActions,
  AuthenticationState,
  GET_TOKENS_SUCCESS,
  LOGOUT_SUCCESS,
} from './types';

const initialAuthenticationState: AuthenticationState = {};

export const authenticationReducer = (
  state: AuthenticationState = initialAuthenticationState,
  action: AuthenticationActions
): AuthenticationState => {
  switch (action.type) {
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        userId: action.payload.userId,
        username: action.payload.username,
        lastLogin: action.payload.lastLogin,
      };
    case LOGOUT_SUCCESS:
      return { ...state, accessToken: undefined, refreshToken: undefined };
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
