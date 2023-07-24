import { axiosInstance } from '@/utils/utils';

// Create new Mading
export const createComment = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post('/comment', data, config);

  return response.data;
};

// Get All Mading
const getAllComment = async () => {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  const response = await axiosInstance.get('/comment', config);

  return response.data;
};

// Delete Mading
export const deleteComment = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'multipart/form-data',
    },
  };

  const response = await axiosInstance.delete(`/comment/${id}`, config);

  return response;
};

const commentService = {
  getAllComment,
  createComment,
};

export default commentService;
