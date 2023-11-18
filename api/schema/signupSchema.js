export const signupSchema = {
  type: 'object',
  properties: {
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
