import { axiosInstance } from '@/utils/utils';

// Create new Mading
const createMading = async (data, token) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post('/mading/create', data, config);

  return response.data;
};

// Get Mading
const getMading = async (madingId, madingData) => {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  const response = await axiosInstance.get(
    `/mading/${madingId}`,
    madingData,
    config
  );

  return response.data;
};

// Get All Mading
const getAllMading = async () => {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  const response = await axiosInstance.get('/mading', config);

  return response.data;
};

// Delete Mading
const deleteMading = async (madingId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'multipart/form-data',
    },
  };

  const response = await axiosInstance.delete(`/mading/${madingId}`, config);

  return response.data;
};

const madingService = {
  createMading,
  getMading,
  getAllMading,
  deleteMading,
};

export default madingService;
