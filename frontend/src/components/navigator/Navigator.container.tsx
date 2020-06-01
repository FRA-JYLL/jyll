import { connect } from 'react-redux';
import { RootState } from 'redux/root';
import { getUserInfoActionCreator, accessTokenSelector } from 'redux/authentication';
import { showNextPageActionCreator, nextPageSelector, currentPageSelector } from 'redux/navigation';
import Navigator from './Navigator.component';
import { showToastSelector, toastMessageSelector } from 'redux/toast';

const mapStateToProps = (state: RootState) => {
  return {
    accessToken: accessTokenSelector(state),
    nextPage: nextPageSelector(state),
    currentPage: currentPageSelector(state),
    showToast: showToastSelector(state),
    toastMessage: toastMessageSelector(state),
  };
};

const mapDispatchToProps = {
  getUserInfo: getUserInfoActionCreator,
  showNextPage: showNextPageActionCreator,
};

export type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
