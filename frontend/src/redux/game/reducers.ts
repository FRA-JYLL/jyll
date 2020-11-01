import {
  BuildingAction,
  BackendBuildingAction,
  ScienceFocus,
  BackendScienceFocus,
  GameActions,
  GameState,
  EndTurnData,
  BackendEndTurnData,
  BEGIN_TURN_SUCCESS,
  FullPlayer,
  BackendFullPlayer,
} from './types';

const initialLobbyState: GameState = {
  endTurnData: {
    buildingActions: [],
    scienceFocuses: [],
  },
  fullPlayer: undefined,
};

const backendBuildingActionFormatter = ({
  classId,
  action,
  copies,
}: BuildingAction): BackendBuildingAction => ({
  class_id: classId,
  action,
  copies,
});

const backendScienceFocusFormatter = ({
  buildingCopyIndex,
  domainIndex,
}: ScienceFocus): BackendScienceFocus => ({
  building_copy_index: buildingCopyIndex,
  domain_index: domainIndex,
});

export const backendEndTurnDataFormatter = (endTurnData: EndTurnData): BackendEndTurnData => ({
  building_actions: endTurnData.buildingActions.map((buildingAction: BuildingAction) =>
    backendBuildingActionFormatter(buildingAction)
  ),
  science_focuses: endTurnData.scienceFocuses.map((scienceFocus: ScienceFocus) =>
    backendScienceFocusFormatter(scienceFocus)
  ),
});

const fullPlayerFormatter = ({
  id,
  username,
  is_admin,
  user,
  game,
  is_ready,
  production,
  ratings,
  resources,
  domains,
  technologies,
  buildings,
}: BackendFullPlayer): FullPlayer => ({
  id,
  username,
  isAdmin: is_admin,
  userId: user,
  gameId: game,
  isReady: is_ready,
  production,
  ratings,
  resources,
  domains,
  technologies,
  buildings,
});

export const gameReducer = (
  state: GameState = initialLobbyState,
  action: GameActions
): GameState => {
  switch (action.type) {
    case BEGIN_TURN_SUCCESS:
      const fullPlayer = action.payload.fullPlayer;
      return {
        ...state,
        fullPlayer: fullPlayerFormatter(fullPlayer),
      };
    default:
      return state;
  }
};
