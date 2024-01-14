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

export const updatePasswordSchema = {
  type: 'object',
  currentPassword: {
    displayName: {
      type: 'string'
    },
    newPassword: {
      type: 'string'
    },
    confirmPassword: {
      type: 'string'
    }
  },
  required: ['currentPassword', 'newPassword', 'confirmPassword']
};
