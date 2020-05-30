import {
  SHOW_MAIN_LOADER_SUCCESS,
  HIDE_MAIN_LOADER_SUCCESS,
  NavigationState,
  NavigationActions,
  SHOW_TOAST_SUCCESS,
  HIDE_TOAST_SUCCESS,
} from './types';

const initialNavigationState: NavigationState = {
  showMainLoader: false,
  showToast: false,
  toastMessage: '',
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
    case SHOW_TOAST_SUCCESS:
      return {
        ...state,
        showToast: true,
        toastMessage: action.payload.message,
      };
    case HIDE_TOAST_SUCCESS:
      return {
        ...state,
        showToast: false,
      };
    default:
      return state;
  }
};
