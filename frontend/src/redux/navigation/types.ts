export const SHOW_MAIN_LOADER_SUCCESS = 'SHOW_MAIN_LOADER_SUCCESS';
export const HIDE_MAIN_LOADER_SUCCESS = 'HIDE_MAIN_LOADER_SUCCESS';
export const SHOW_TOAST_REQUEST = 'SHOW_TOAST_REQUEST';
export const SHOW_TOAST_SUCCESS = 'SHOW_TOAST_SUCCESS';
export const HIDE_TOAST_SUCCESS = 'HIDE_TOAST_SUCCESS';

export type NavigationActions =
  | ShowMainLoaderSuccess
  | HideMainLoaderSuccess
  | ShowToastSuccess
  | HideToastSuccess;

export interface ShowMainLoaderSuccess {
  type: typeof SHOW_MAIN_LOADER_SUCCESS;
}

export interface HideMainLoaderSuccess {
  type: typeof HIDE_MAIN_LOADER_SUCCESS;
}

export interface ShowToastRequest {
  type: typeof SHOW_TOAST_REQUEST;
  payload: {
    message: string;
    duration: number;
  };
}

export interface ShowToastSuccess {
  type: typeof SHOW_TOAST_SUCCESS;
  payload: {
    message: string;
  };
}

export interface HideToastSuccess {
  type: typeof HIDE_TOAST_SUCCESS;
}

export interface NavigationState {
  showMainLoader: boolean;
  showToast: boolean;
  toastMessage: string;
}
