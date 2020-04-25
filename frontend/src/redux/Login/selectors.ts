import { RootState } from 'redux/root';

export const getUsername = (store: RootState) => store.login.username;
