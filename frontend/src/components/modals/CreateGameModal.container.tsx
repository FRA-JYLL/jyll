import { connect } from 'react-redux';
import CreateGameModalComponent from './CreateGameModal.component';
import { createGameActionCreator } from 'redux/lobby';

const mapDispatchToProps = {
  createGame: createGameActionCreator,
};

export type ContainerProps = typeof mapDispatchToProps;

export const CreateGameModal = connect(null, mapDispatchToProps)(CreateGameModalComponent);
