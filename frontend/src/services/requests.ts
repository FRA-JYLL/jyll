const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || '';

export const signup = async (username: string, password: string) => {
  const response = await fetch(`${apiBaseUrl}/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const payload = await response.json();
  if (payload.access && payload.refresh) {
    localStorage.setItem('access', payload.access);
    localStorage.setItem('refresh', payload.refresh);

    return { userId: payload.id, username: payload.username };
  }

  return null;
};
