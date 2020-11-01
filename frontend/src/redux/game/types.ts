export const END_TURN_REQUEST = 'END_TURN_REQUEST';

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

export interface EndTurnRequest {
  type: typeof END_TURN_REQUEST;
}

export type GameActions = any;

export interface GameState {
  endTurnData: EndTurnData;
}
