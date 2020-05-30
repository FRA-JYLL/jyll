import {
  SHOW_MAIN_LOADER_SUCCESS,
  HIDE_MAIN_LOADER_SUCCESS,
  NavigationState,
  NavigationActions,
  SHOW_TOAST_SUCCESS,
  HIDE_TOAST_SUCCESS,
  QUEUE_TOAST_SUCCESS,
} from './types';

const initialNavigationState: NavigationState = {
  showMainLoader: false,
  showToast: false,
  toastMessage: '',
  toastQueue: [],
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
        toastMessage: state.toastQueue[0] && state.toastQueue[0].message,
      };
    case HIDE_TOAST_SUCCESS:
      return {
        ...state,
        showToast: false,
        toastQueue: state.toastQueue.slice(1),
      };
    case QUEUE_TOAST_SUCCESS:
      return {
        ...state,
        toastQueue: state.toastQueue.concat([action.payload]),
      };
    default:
      return state;
  }
};
