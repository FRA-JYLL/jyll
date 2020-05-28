const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || '';

export const signup = async (username: string, password: string) => {
  // TODO: Rename to signupRequest
  const response = await fetch(`${apiBaseUrl}/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const payload = await response.json();
  if (payload.access && payload.refresh) {
    localStorage.setItem('accessToken', payload.access);
    localStorage.setItem('refreshToken', payload.refresh);
  }

  return !!(payload.access && payload.refresh);
};

export const login = async (username: string, password: string) => {
  // TODO: Rename to loginRequest
  const response = await fetch(`${apiBaseUrl}/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const payload = await response.json();
  if (payload.access && payload.refresh) {
    localStorage.setItem('accessToken', payload.access);
    localStorage.setItem('refreshToken', payload.refresh);
  }

  return !!(payload.access && payload.refresh);
};

export const getUserInfoRequest = async (accessToken: string) => {
  const response = await fetch(`${apiBaseUrl}/users/me/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const payload = await response.json();

  return payload;
};
