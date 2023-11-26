import axios from 'axios';

const instance = axios.create({
  baseURL: '/',
  timeout: 5000
});

instance.defaults.headers.common['Content-Type'] = 'application/json';

export const createNewUser = (formData) => {
  return instance.post('/api/auth/signup', formData);
};

export const signInUser = (formData) => {
  return instance.post('/api/auth/signin', formData);
};

export const signInWithGoogle = (userData) => {
  const body = JSON.stringify({
    name: userData.user.displayName,
    email: userData.user.email,
    photo: userData.user.photo
  });
  return instance.post('/api/auth/google', body);
};
