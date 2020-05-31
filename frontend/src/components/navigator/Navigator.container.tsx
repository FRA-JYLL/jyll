import { connect } from 'react-redux';
import { RootState } from 'redux/root';
import {
  usernameSelector,
  getUserInfoActionCreator,
  accessTokenSelector,
} from 'redux/authentication';
import { showMainLoaderSelector } from 'redux/navigation';
import Navigator from './Navigator.component';
import { showToastSelector, toastMessageSelector } from 'redux/toast';

const mapStateToProps = (state: RootState) => {
  return {
    username: usernameSelector(state),
    accessToken: accessTokenSelector(state),
    showMainLoader: showMainLoaderSelector(state),
    showToast: showToastSelector(state),
    toastMessage: toastMessageSelector(state),
  };
};

const mapDispatchToProps = {
  getUserInfo: getUserInfoActionCreator,
};

export type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
