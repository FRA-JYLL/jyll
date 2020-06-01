import {
  SET_NEXT_PAGE_SUCCESS,
  SHOW_NEXT_PAGE_SUCCESS,
  NavigationState,
  NavigationActions,
  NavigationPage,
} from './types';

const initialNavigationState: NavigationState = {
  currentPage: NavigationPage.FirstLoader,
};

export const navigationReducer = (
  state: NavigationState = initialNavigationState,
  action: NavigationActions
) => {
  switch (action.type) {
    case SET_NEXT_PAGE_SUCCESS:
      return {
        ...state,
        nextPage:
          action.payload.nextPage !== state.currentPage ? action.payload.nextPage : undefined,
      };
    case SHOW_NEXT_PAGE_SUCCESS:
      return state.nextPage !== undefined
        ? {
            ...state,
            nextPage: undefined,
            currentPage: state.nextPage,
          }
        : state;
    default:
      return state;
  }
};
