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
      buttons: {
        login: 'LOG IN',
        signup: 'SIGN UP',
      },
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
      joinGameModal: {
        gamePassword: 'A password is required',
        cancel: 'CANCEL',
        submit: 'JOIN',
      },
      logout: 'LOG OUT',
      created: 'Created {{creationDate}}',
      open: 'OPEN',
      join: 'JOIN',
      leave: 'LEAVE',
      myGames: 'My games',
      publicGames: 'Public games',
    },
    gameRoom: {
      title: 'Hello {{username}}!',
      ready: 'Ready',
      notReady: 'Not ready',
      buttons: {
        back: 'BACK',
        leave: 'LEAVE GAME',
        start: 'START',
        ready: 'READY',
        notReady: 'NOT READY',
      },
    },
  },
  game: {
    ui: {
      endTurn: 'END TURN',
    },
  },
  toast: {
    signupError: 'Error: this username is already taken',
    loginError: 'Error: invalid username or password',
    gameCreationFailureError: 'Error: your game could not be created, please try again',
    cannotJoinGameError: 'Error: Cannot join game',
  },
};
