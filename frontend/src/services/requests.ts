import { BackendLobbyPlayer, BackendLobbyGame } from 'redux/lobby/types';
import { BackendEndTurnData, BackendFullPlayer } from 'redux/game/types';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || '';

export const signupRequest = async (credentials: {
  username: string;
  password: string;
}): Promise<{ access: string; refresh: string }> => {
  const response = await fetch(`${apiBaseUrl}/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) throw response.status;

  const payload = await response.json();

  return payload;
};

export const loginRequest = async (credentials: {
  username: string;
  password: string;
}): Promise<{ access: string; refresh: string }> => {
  const response = await fetch(`${apiBaseUrl}/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) throw response.status;

  const payload = await response.json();

  return payload;
};

export const getUserInfoRequest = async (
  accessToken: string
): Promise<{ username: string; id: string; last_login: string }> => {
  const response = await fetch(`${apiBaseUrl}/users/me/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw response.status;

  const payload = await response.json();

  return payload;
};

export const getNewAccessTokenRequest = async (
  refreshToken: string
): Promise<{ access: string }> => {
  const response = await fetch(`${apiBaseUrl}/auth/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!response.ok) throw response.status;

  const payload = await response.json();

  return payload;
};

export const createGameRequest = async (
  accessToken: string,
  gameName?: string,
  gamePassword?: string
): Promise<BackendLobbyGame> => {
  const response = await fetch(`${apiBaseUrl}/game/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ name: gameName, password: gamePassword }),
  });

  if (!response.ok) throw response.status;

  const payload = await response.json();

  return payload;
};

export const getPendingGamesRequest = async (accessToken: string): Promise<BackendLobbyGame[]> => {
  const response = await fetch(`${apiBaseUrl}/game/pending/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw response.status;

  const payload = await response.json();

  return payload;
};

export const getGamesWithUserRequest = async (accessToken: string): Promise<BackendLobbyGame[]> => {
  const response = await fetch(`${apiBaseUrl}/game/with_user/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw response.status;

  const payload = await response.json();

  return payload;
};

export const getGameDetailsRequest = async (
  accessToken: string,
  id: string
): Promise<BackendLobbyGame> => {
  const response = await fetch(`${apiBaseUrl}/game/${id}/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw response.status;

  const payload = await response.json();

  return payload;
};

export const joinGameRequest = async (accessToken: string, id: string, password?: string) => {
  const response = await fetch(`${apiBaseUrl}/game/${id}/join/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      password,
    }),
  });

  if (!response.ok) throw response.status;
};

export const getGamePlayersRequest = async (
  accessToken: string,
  id: string
): Promise<BackendLobbyPlayer[]> => {
  const response = await fetch(`${apiBaseUrl}/game/${id}/players/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw response.status;

  const payload = await response.json();

  return payload;
};

export const leaveGameRequest = async (accessToken: string, id: string) => {
  const response = await fetch(`${apiBaseUrl}/game/${id}/leave/`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw response.status;
};

export const setIsReadyRequest = async (accessToken: string, id: string, isReady: boolean) => {
  const response = await fetch(`${apiBaseUrl}/player/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      is_ready: isReady,
    }),
  });

  if (!response.ok) throw response.status;
};

export const endTurnRequest = async (
  accessToken: string,
  id: string,
  endTurnData: BackendEndTurnData
) => {
  const response = await fetch(`${apiBaseUrl}/player/${id}/turn/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(endTurnData),
  });

  if (!response.ok) throw response.status;
};

export const beginTurnRequest = async (
  accessToken: string,
  id: string
): Promise<BackendFullPlayer> => {
  const response = await fetch(`${apiBaseUrl}/player/${id}/turn/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw response.status;

  const payload = await response.json();

  return payload;
};
