import {
  SHOW_TOAST_SUCCESS,
  HIDE_TOAST_SUCCESS,
  QUEUE_TOAST_SUCCESS,
  ToastState,
  ToastActions,
} from './types';

const initialToastState: ToastState = {
  showToast: false,
  toastMessage: '',
  toastQueue: [],
};

export const toastReducer = (state: ToastState = initialToastState, action: ToastActions) => {
  switch (action.type) {
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
