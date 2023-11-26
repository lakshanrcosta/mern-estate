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
    },
    avatar: {
      type: 'string'
    }
  },
  required: ['displayName', 'username', 'email', 'password']
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

export const signInWithGoogleSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    avatar: {
      type: 'string'
    }
  },
  required: ['name', 'email', 'avatar']
};
