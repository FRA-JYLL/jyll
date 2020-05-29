import { RootState } from 'redux/root';

export const usernameSelector = (store: RootState) => store.authentication.username;

export const accessTokenSelector = (store: RootState) => store.authentication.accessToken;

export const refreshTokenSelector = (store: RootState) => store.authentication.refreshToken;
