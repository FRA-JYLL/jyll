import {
  ShowMainLoaderSuccess,
  SHOW_MAIN_LOADER_SUCCESS,
  HideMainLoaderSuccess,
  HIDE_MAIN_LOADER_SUCCESS,
  ShowToastRequest,
  SHOW_TOAST_REQUEST,
} from './types';

export const showMainLoaderActionCreator = (): ShowMainLoaderSuccess => ({
  type: SHOW_MAIN_LOADER_SUCCESS,
});

export const hideMainLoaderActionCreator = (): HideMainLoaderSuccess => ({
  type: HIDE_MAIN_LOADER_SUCCESS,
});

export const showToastActionCreator = (message: string, duration?: number): ShowToastRequest => {
  if (duration === undefined) duration = 3000;

  return {
    type: SHOW_TOAST_REQUEST,
    payload: {
      message,
      duration,
    },
  };
};

export type ShowMainLoaderActionCreator = typeof showMainLoaderActionCreator;
export type HideMainLoaderActionCreator = typeof hideMainLoaderActionCreator;
export type ShowToastActionCreator = typeof showToastActionCreator;
