import {
  ShowMainLoaderSuccess,
  SHOW_MAIN_LOADER_SUCCESS,
  HideMainLoaderSuccess,
  HIDE_MAIN_LOADER_SUCCESS,
} from './types';

export const showMainLoaderActionCreator = (): ShowMainLoaderSuccess => ({
  type: SHOW_MAIN_LOADER_SUCCESS,
});

export const hideMainLoaderActionCreator = (): HideMainLoaderSuccess => ({
  type: HIDE_MAIN_LOADER_SUCCESS,
});

export type ShowMainLoaderActionCreator = typeof showMainLoaderActionCreator;
export type HideMainLoaderActionCreator = typeof hideMainLoaderActionCreator;
