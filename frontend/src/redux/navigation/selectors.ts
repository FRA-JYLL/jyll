import { RootState } from 'redux/root';

export const showMainLoaderSelector = (store: RootState) => store.navigation.showMainLoader;
