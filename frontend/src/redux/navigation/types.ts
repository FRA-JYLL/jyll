export const SHOW_MAIN_LOADER_SUCCESS = 'SHOW_MAIN_LOADER_SUCCESS';
export const HIDE_MAIN_LOADER_SUCCESS = 'HIDE_MAIN_LOADER_SUCCESS';

export type NavigationActions = ShowMainLoaderSuccess | HideMainLoaderSuccess;

export interface ShowMainLoaderSuccess {
  type: typeof SHOW_MAIN_LOADER_SUCCESS;
}

export interface HideMainLoaderSuccess {
  type: typeof HIDE_MAIN_LOADER_SUCCESS;
}

export interface NavigationState {
  showMainLoader: boolean;
}
