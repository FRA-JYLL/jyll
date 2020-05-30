export const SHOW_TOAST_REQUEST = 'SHOW_TOAST_REQUEST';
export const SHOW_TOAST_SUCCESS = 'SHOW_TOAST_SUCCESS';
export const HIDE_TOAST_SUCCESS = 'HIDE_TOAST_SUCCESS';
export const QUEUE_TOAST_SUCCESS = 'QUEUE_TOAST_SUCCESS';

export type ToastActions = ShowToastSuccess | HideToastSuccess | QueueToastSuccess;

export interface ShowToastRequest {
  type: typeof SHOW_TOAST_REQUEST;
  payload: {
    message: string;
    duration: number;
  };
}

export interface ShowToastSuccess {
  type: typeof SHOW_TOAST_SUCCESS;
}

export interface HideToastSuccess {
  type: typeof HIDE_TOAST_SUCCESS;
}

export interface QueueToastSuccess {
  type: typeof QUEUE_TOAST_SUCCESS;
  payload: ShowToastRequest['payload'];
}

export interface ToastState {
  showToast: boolean;
  toastMessage: string;
  toastQueue: Array<ShowToastRequest['payload']>;
}
