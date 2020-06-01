export enum NavigationPage {
  Authentication = 'Authentication',
  GameSelection = 'GameSelection',
  Loader = 'Loader',
}

export const SET_NEXT_PAGE_SUCCESS = 'SET_NEXT_PAGE_SUCCESS';
export const SHOW_NEXT_PAGE_SUCCESS = 'SHOW_NEXT_PAGE_SUCCESS';

export type NavigationActions = SetNextPageSuccess | ShowNextPageSuccess;

export interface SetNextPageSuccess {
  type: typeof SET_NEXT_PAGE_SUCCESS;
  payload: {
    nextPage: NavigationPage;
  };
}

export interface ShowNextPageSuccess {
  type: typeof SHOW_NEXT_PAGE_SUCCESS;
}

export interface NavigationState {
  nextPage?: NavigationPage;
  currentPage: NavigationPage;
}
