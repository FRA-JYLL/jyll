import { RootState } from 'redux/root';

export const nextPageSelector = (store: RootState) => store.navigation.nextPage;
export const currentPageSelector = (store: RootState) => store.navigation.currentPage;
