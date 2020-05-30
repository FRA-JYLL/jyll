import { RootState } from 'redux/root';

export const showMainLoaderSelector = (store: RootState) => store.navigation.showMainLoader;

export const showToastSelector = (store: RootState) => store.navigation.showToast;

export const toastMessageSelector = (store: RootState) => store.navigation.toastMessage;
