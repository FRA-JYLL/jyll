export default {
  pages: {
    authentication: {
      title: "You aren't logged in!",
      subtitle: 'You bad neutron star',
      login: 'Log in',
      signup: 'Sign up',
      username: 'Username',
      password: 'Password',
      submit: 'Submit Query',
      usernameAlreadyTaken: 'Error: this username is already taken',
      invalidCredentials: 'Error: username or password is invalid',
    },
    gameSelection: {
      welcome: 'Welcome, {{username}}! You finally logged in',
      subtitle: 'You good neutron star',
      enjoy: 'Now enjoy staring at a stellar page \\(°-° )/',
      createGame: 'CREATE GAME',
      createGameModal: {
        gameName: 'Game name (optional)',
        gamePassword: 'Password (optional)',
        cancel: 'CANCEL',
        submit: 'CREATE',
      },
      logout: 'LOG OUT',
    },
    gameRoom: { title: 'Hello {{username}}!', back: 'BACK' },
  },
  toast: {
    signupError: 'Error: this username is already taken',
    loginError: 'Error: invalid username or password',
    gameCreationFailureError: 'Error: your game could not be created, please try again',
  },
};
