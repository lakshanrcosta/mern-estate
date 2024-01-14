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
    avatar: userData.user.photoURL
  });
  return instance.post('/api/auth/google', body);
};

export const updateUser = (formData, userId) => {
  return instance.post(`/api/user/update/${userId}`, formData);
};

export const deleteUser = (userId) => {
  return instance.delete(`/api/user/delete/${userId}`);
};

export const updatePassword = (formData, userId) => {
  return instance.patch(`/api/user/update-password/${userId}`, formData);
};
