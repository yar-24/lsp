import { axiosInstance } from '@/utils/utils';

const register = async (data) => {
  const response = await axiosInstance.post('/users/register', data);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axiosInstance.post('/users/login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

//logout user

const logout = () => {
  localStorage.removeItem('user');
};

//get user

const authReducer = {
  register,
  login,
  logout,
};

export default authReducer;
