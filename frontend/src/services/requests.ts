const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || '';

export const signupRequest = async (credentials: { username: string; password: string }) => {
  const response = await fetch(`${apiBaseUrl}/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const payload = await response.json();

  return payload;
};

export const loginRequest = async (credentials: { username: string; password: string }) => {
  const response = await fetch(`${apiBaseUrl}/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const payload = await response.json();

  return payload;
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
