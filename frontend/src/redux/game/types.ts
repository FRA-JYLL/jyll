import { BackendLobbyPlayer, LobbyPlayer } from 'redux/lobby/types';

export const END_TURN_REQUEST = 'END_TURN_REQUEST';
export const BEGIN_TURN_REQUEST = 'BEGIN_TURN_REQUEST';
export const BEGIN_TURN_SUCCESS = 'BEGIN_TURN_SUCCESS';

export type BuildingAction = {
  classId: string;
  action: 'BUILD';
  copies: number;
};

export type BackendBuildingAction = {
  class_id: string;
  action: 'BUILD';
  copies: number;
};

export type ScienceFocus = {
  buildingCopyIndex: string;
  domainIndex: string;
};

export type BackendScienceFocus = {
  building_copy_index: string;
  domain_index: string;
};

export interface EndTurnData {
  buildingActions: BuildingAction[];
  scienceFocuses: ScienceFocus[];
}

export interface BackendEndTurnData {
  building_actions: BackendBuildingAction[];
  science_focuses: BackendScienceFocus[];
}

export interface FullPlayer extends LobbyPlayer {
  // TODO: Type this
  production: any;
  ratings: any;
  resources: any;
  domains: any;
  technologies: any;
  buildings: any;
}

export interface BackendFullPlayer extends BackendLobbyPlayer {
  // TODO: Type this
  production: any;
  ratings: any;
  resources: any;
  domains: any;
  technologies: any;
  buildings: any;
}

export interface EndTurnRequest {
  type: typeof END_TURN_REQUEST;
}

export interface BeginTurnRequest {
  type: typeof BEGIN_TURN_REQUEST;
}

export interface BeginTurnSuccess {
  type: typeof BEGIN_TURN_SUCCESS;
  payload: { fullPlayer: BackendFullPlayer };
}

export type GameActions = BeginTurnSuccess;

export interface GameState {
  endTurnData: EndTurnData;
  fullPlayer?: FullPlayer;
}
