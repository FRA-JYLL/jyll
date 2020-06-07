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
      welcome: 'Welcome, {{username}}!',
      instructions: "Here you can join another player's game, or even create your own.",
      createGame: 'CREATE GAME',
      createGameModal: {
        gameName: 'Game name (optional)',
        gamePassword: 'Password (optional)',
        cancel: 'CANCEL',
        submit: 'CREATE',
      },
      logout: 'LOG OUT',
      created: 'Created {{creationDate}}',
      join: 'JOIN',
    },
    gameRoom: { title: 'Hello {{username}}!', back: 'BACK' },
  },
  toast: {
    signupError: 'Error: this username is already taken',
    loginError: 'Error: invalid username or password',
    gameCreationFailureError: 'Error: your game could not be created, please try again',
  },
};
