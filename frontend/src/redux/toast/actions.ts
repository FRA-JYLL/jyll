import { ShowToastRequest, SHOW_TOAST_REQUEST } from './types';

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

export type ShowToastActionCreator = typeof showToastActionCreator;
