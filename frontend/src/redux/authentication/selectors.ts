import { RootState } from 'redux/root';

export const usernameSelector = (store: RootState) => store.authentication.username;
