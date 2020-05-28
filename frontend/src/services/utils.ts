export const setTokens = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};
