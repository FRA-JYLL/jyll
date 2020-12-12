import {
  BuildingAction,
  BackendBuildingAction,
  ScienceFocus,
  BackendScienceFocus,
  GameActions,
  GameState,
  EndTurnData,
  BackendEndTurnData,
  GET_FULL_PLAYER_SUCCESS,
  FullPlayer,
  BackendFullPlayer,
  BackendPlayerProduction,
  BackendPlayerDomain,
  PlayerDomain,
  PlayerProduction,
  BackendPlayerTechnology,
  PlayerTechnology,
  PlayerBuilding,
  BackendPlayerBuilding,
  UPDATE_BUILDINGS_BALANCE,
  UPDATE_END_TURN_DATA,
  RESET_BUILDING_ACTIONS,
  RESET_GAME_DATA,
} from './types';

const initialGameState: GameState = {
  endTurnData: {
    buildingActions: [],
    scienceFocuses: [],
  },
  buildingsBalance: {},
  fullPlayer: undefined,
};

const backendBuildingActionFormatter = ({
  classIndex,
  type,
  copies,
}: BuildingAction): BackendBuildingAction => ({
  class_index: classIndex,
  type,
  copies,
});

const backendScienceFocusFormatter = ({
  buildingCopyId,
  domainIndex,
}: ScienceFocus): BackendScienceFocus => ({
  building_copy_id: buildingCopyId,
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

const playerProductionFormatter = ({
  money,
  hydrocarbon,
  hydrocarbon_consumption,
  food,
  electricity,
  waste,
  pollution,
  science,
}: BackendPlayerProduction): PlayerProduction => ({
  money,
  hydrocarbon,
  hydrocarbonConsumption: hydrocarbon_consumption,
  food,
  electricity,
  waste,
  pollution,
  science,
});

const playerDomainFormatter = ({
  domain_index,
  next_technology_class_index,
  science_points,
}: BackendPlayerDomain): PlayerDomain => ({
  domainIndex: domain_index,
  nextTechnologyClassIndex: next_technology_class_index,
  sciencePoints: science_points,
});

const playerTechnologyFormatter = ({
  class_index,
  current_level,
  domain,
  level_costs,
}: BackendPlayerTechnology): PlayerTechnology => ({
  classIndex: class_index,
  currentLevel: current_level,
  domain: {
    id: domain.id,
    domainIndex: domain.domain_index,
    nextTechnologyClassIndex: domain.next_technology_class_index,
    sciencePoints: domain.science_points,
    player: domain.player,
  },
  levelCosts: level_costs,
});

const playerBuildingFormatter = ({
  class_index,
  quantity_cap,
  cost,
  copies,
  production,
  ratings,
  domains_focused_on,
}: BackendPlayerBuilding): PlayerBuilding => ({
  classIndex: class_index,
  quantityCap: quantity_cap,
  cost,
  copies,
  production: {
    id: production.id,
    money: production.money,
    hydrocarbon: production.hydrocarbon,
    hydrocarbonConsumption: production.hydrocarbon_consumption,
    food: production.food,
    electricity: production.electricity,
    waste: production.waste,
    pollution: production.pollution,
    science: production.science,
    building: production.building,
  },
  ratings,
  domainsFocusedOn: domains_focused_on,
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
  production: playerProductionFormatter(production),
  ratings,
  resources,
  domains: domains.map((domain) => playerDomainFormatter(domain)),
  technologies: technologies.map((technology) => playerTechnologyFormatter(technology)),
  buildings: buildings.map((building) => playerBuildingFormatter(building)),
});

export const gameReducer = (
  state: GameState = initialGameState,
  action: GameActions
): GameState => {
  switch (action.type) {
    case GET_FULL_PLAYER_SUCCESS:
      const fullPlayer = action.payload.fullPlayer;
      return {
        ...state,
        fullPlayer: fullPlayerFormatter(fullPlayer),
      };
    case UPDATE_BUILDINGS_BALANCE:
      const { classIndex, modifier } = action.payload;
      return {
        ...state,
        buildingsBalance: {
          ...state.buildingsBalance,
          [classIndex]: (state.buildingsBalance[classIndex] || 0) + modifier,
        },
      };
    case RESET_BUILDING_ACTIONS:
      return {
        ...state,
        buildingsBalance: {},
        endTurnData: { ...state.endTurnData, buildingActions: [] },
      };
    case UPDATE_END_TURN_DATA:
      const endTurnData = action.payload.endTurnData;
      return {
        ...state,
        endTurnData,
      };
    case RESET_GAME_DATA:
      return initialGameState;
    default:
      return state;
  }
};
