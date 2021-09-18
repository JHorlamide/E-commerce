import axios from 'axios';

/* Register new user */
export const register = (registerData) => {
  return axios.post('/api/users/register', registerData);
};

/* User authentication */
export const login = (loginData) => {
  return axios.post('/api/auth/login', loginData);
};

/* Get user profile */
export const getUserProfile = (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get('/api/users/profile', config);
};

/* Update user */
export const updateUserProfile = (profileData, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.put('/api/users/profile', profileData, config);
};

/* Get users by id | Admin Users Only*/
export const getUserDetails = (userId, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(`/api/users/${userId}`, config);
};

/* Get users | Admin Users Only*/
export const getUserList = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get('/api/users', config);
};

/* Delete User | Admin User Only */
export const deleteUser = (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.delete(`/api/users/${id}`, config);
};

/*  Admin Update User */
export const adminUpdateUser = (id, user, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.put(`/api/users/${id}`, user, config);
};
