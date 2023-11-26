export const signUpSchema = {
  type: 'object',
  properties: {
    displayName: {
      type: 'string'
    },
    username: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  required: ['username', 'email', 'password']
};

export const signInSchema = {
  type: 'object',
  properties: {
    usernameOrEmail: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  required: ['usernameOrEmail', 'password']
};
