import { RootState } from 'redux/root';

export const showToastSelector = (store: RootState) => store.toast.showToast;

export const toastMessageSelector = (store: RootState) => store.toast.toastMessage;

export const toastQueueSelector = (store: RootState) => store.toast.toastQueue;
