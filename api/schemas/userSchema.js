export const updateUserSchema = {
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
    avatar: {
      type: 'string'
    }
  }
};
