import { BackendLobbyPlayer, LobbyPlayer } from 'redux/lobby/types';

export const END_TURN_REQUEST = 'END_TURN_REQUEST';
export const GET_FULL_PLAYER_REQUEST = 'GET_FULL_PLAYER_REQUEST';
export const GET_FULL_PLAYER_SUCCESS = 'GET_FULL_PLAYER_SUCCESS';
export const UPDATE_BUILDINGS_BALANCE = 'UPDATE_BUILDINGS_BALANCE';
export const RESET_BUILDING_ACTIONS = 'RESET_BUILDING_ACTIONS';
export const UPDATE_END_TURN_DATA = 'UPDATE_END_TURN_DATA';
export const RESET_GAME_DATA = 'RESET_GAME_DATA';
export const GET_NEW_TURN_DATA_REQUEST = 'GET_NEW_TURN_DATA_REQUEST';
export const SET_PLAYER_IS_READY_LOCALLY = 'SET_PLAYER_IS_READY_LOCALLY';

export enum buildingActionTypes {
  'BUILD' = 'BUILD',
  'CLOSE' = 'CLOSE',
}

export type BuildingAction = {
  classIndex: string;
  type: buildingActionTypes;
  copies: number;
};

export type BackendBuildingAction = {
  class_index: string;
  type: buildingActionTypes;
  copies: number;
};

export type ScienceFocus = {
  buildingCopyId: string;
  domainIndex: string;
};

export type BackendScienceFocus = {
  building_copy_id: string;
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

export interface PlayerProduction {
  money: number;
  hydrocarbon: number;
  hydrocarbonConsumption: number;
  food: number;
  electricity: number;
  waste: number;
  pollution: number;
  science: number;
}

export interface PlayerRatings {
  economy: number;
  society: number;
  environment: number;
  score: number;
}

export interface PlayerResources {
  money: number;
  hydrocarbon: number;
}

export interface PlayerDomain {
  domainIndex: number;
  nextTechnologyClassIndex: string;
  sciencePoints: number;
}

export interface PlayerTechnology {
  classIndex: string;
  currentLevel: number;
  domain: {
    id: string;
    domainIndex: string;
    nextTechnologyClassIndex: string;
    sciencePoints: number;
    player: string;
  };
  levelCosts: { id: string; level: number; cost: number; technology: string }[];
}

export interface PlayerBuilding {
  classIndex: string;
  quantityCap: number;
  cost: number;
  copies: number;
  production: {
    id: string;
    money: number;
    hydrocarbon: number;
    hydrocarbonConsumption: number;
    food: number;
    electricity: number;
    waste: number;
    pollution: number;
    science: number;
    building: string;
  };
  ratings: {
    id: string;
    economy: number;
    society: number;
    environment: number;
    building: string;
  };
  domainsFocusedOn: { [key: string]: string };
}

export interface FullPlayer extends LobbyPlayer {
  production: PlayerProduction;
  ratings: PlayerRatings;
  resources: PlayerResources;
  domains: PlayerDomain[];
  technologies: PlayerTechnology[];
  buildings: PlayerBuilding[];
}

export interface BackendPlayerProduction {
  money: number;
  hydrocarbon: number;
  hydrocarbon_consumption: number;
  food: number;
  electricity: number;
  waste: number;
  pollution: number;
  science: number;
}

export interface BackendPlayerRatings {
  economy: number;
  society: number;
  environment: number;
  score: number;
}

export interface BackendPlayerResources {
  money: number;
  hydrocarbon: number;
}

export interface BackendPlayerDomain {
  domain_index: number;
  next_technology_class_index: string;
  science_points: number;
}

export interface BackendPlayerTechnology {
  class_index: string;
  current_level: number;
  domain: {
    id: string;
    domain_index: string;
    next_technology_class_index: string;
    science_points: number;
    player: string;
  };
  level_costs: { id: string; level: number; cost: number; technology: string }[];
}

export interface BackendPlayerBuilding {
  class_index: string;
  quantity_cap: number;
  cost: number;
  copies: number;
  production: {
    id: string;
    money: number;
    hydrocarbon: number;
    hydrocarbon_consumption: number;
    food: number;
    electricity: number;
    waste: number;
    pollution: number;
    science: number;
    building: string;
  };
  ratings: {
    id: string;
    economy: number;
    society: number;
    environment: number;
    building: string;
  };
  domains_focused_on: { [key: string]: string };
}

export interface BackendFullPlayer extends BackendLobbyPlayer {
  production: BackendPlayerProduction;
  ratings: BackendPlayerRatings;
  resources: BackendPlayerResources;
  domains: BackendPlayerDomain[];
  technologies: BackendPlayerTechnology[];
  buildings: BackendPlayerBuilding[];
}

export interface EndTurnRequest {
  type: typeof END_TURN_REQUEST;
}

export interface GetFullPlayerRequest {
  type: typeof GET_FULL_PLAYER_REQUEST;
}

export interface GetFullPlayerSuccess {
  type: typeof GET_FULL_PLAYER_SUCCESS;
  payload: { fullPlayer: BackendFullPlayer };
}

export interface UpdateBuildingsBalance {
  type: typeof UPDATE_BUILDINGS_BALANCE;
  payload: { classIndex: string; copiesModifier: number; moneyModifier: number };
}

export interface ResetBuildingActions {
  type: typeof RESET_BUILDING_ACTIONS;
}

export interface UpdateEndTurnData {
  type: typeof UPDATE_END_TURN_DATA;
  payload: { endTurnData: EndTurnData };
}

export interface ResetGameData {
  type: typeof RESET_GAME_DATA;
}

export interface GetNewTurnDataRequest {
  type: typeof GET_NEW_TURN_DATA_REQUEST;
}

export interface SetPlayerIsReadyLocally {
  type: typeof SET_PLAYER_IS_READY_LOCALLY;
  payload: boolean;
}

export type GameActions =
  | GetFullPlayerSuccess
  | UpdateBuildingsBalance
  | ResetBuildingActions
  | UpdateEndTurnData
  | ResetGameData
  | SetPlayerIsReadyLocally;

export interface BuildingsBalance {
  [key: string]: number;
}

export interface GameState {
  endTurnData: EndTurnData;
  buildingsBalance: BuildingsBalance;
  currentMoneyModifier: number;
  fullPlayer?: FullPlayer;
}
