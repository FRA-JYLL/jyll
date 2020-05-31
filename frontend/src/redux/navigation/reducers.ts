import {
  SHOW_MAIN_LOADER_SUCCESS,
  HIDE_MAIN_LOADER_SUCCESS,
  NavigationState,
  NavigationActions,
} from './types';

const initialNavigationState: NavigationState = {
  showMainLoader: false,
};

export const navigationReducer = (
  state: NavigationState = initialNavigationState,
  action: NavigationActions
) => {
  switch (action.type) {
    case SHOW_MAIN_LOADER_SUCCESS:
      return {
        ...state,
        showMainLoader: true,
      };
    case HIDE_MAIN_LOADER_SUCCESS:
      return {
        ...state,
        showMainLoader: false,
      };
    default:
      return state;
  }
};
