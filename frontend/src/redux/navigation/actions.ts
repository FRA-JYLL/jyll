import {
  NavigationPage,
  SetNextPageSuccess,
  SET_NEXT_PAGE_SUCCESS,
  ShowNextPageSuccess,
  SHOW_NEXT_PAGE_SUCCESS,
} from './types';

export const setNextPageActionCreator = (nextPage: NavigationPage): SetNextPageSuccess => ({
  type: SET_NEXT_PAGE_SUCCESS,
  payload: { nextPage },
});

export const showNextPageActionCreator = (): ShowNextPageSuccess => ({
  type: SHOW_NEXT_PAGE_SUCCESS,
});

export type SetNextPageActionCreator = typeof setNextPageActionCreator;
export type ShowNextPageActionCreator = typeof showNextPageActionCreator;
