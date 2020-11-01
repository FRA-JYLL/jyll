import {
  BuildingAction,
  BackendBuildingAction,
  ScienceFocus,
  BackendScienceFocus,
  GameActions,
  GameState,
  EndTurnData,
  BackendEndTurnData,
} from './types';

const initialLobbyState: GameState = {
  endTurnData: {
    buildingActions: [],
    scienceFocuses: [],
  },
};

const backendBuildingActionFormatter = (buildingAction: BuildingAction): BackendBuildingAction => ({
  class_id: buildingAction.classId,
  action: buildingAction.action,
  copies: buildingAction.copies,
});

const backendScienceFocusFormatter = (scienceFocus: ScienceFocus): BackendScienceFocus => ({
  building_copy_index: scienceFocus.buildingCopyIndex,
  domain_index: scienceFocus.domainIndex,
});

export const backendEndTurnDataFormatter = (endTurnData: EndTurnData): BackendEndTurnData => ({
  building_actions: endTurnData.buildingActions.map((buildingAction: BuildingAction) =>
    backendBuildingActionFormatter(buildingAction)
  ),
  science_focuses: endTurnData.scienceFocuses.map((scienceFocus: ScienceFocus) =>
    backendScienceFocusFormatter(scienceFocus)
  ),
});

export const gameReducer = (
  state: GameState = initialLobbyState,
  action: GameActions
): GameState => {
  return state;
};
