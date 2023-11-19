import axios from 'axios';

const instance = axios.create({
  baseURL: '/',
  timeout: 5000
});

instance.defaults.headers.common['Content-Type'] = 'application/json';

export const createNewUser = (formData) => {
  return instance.post('/api/auth/signup', formData);
};
