import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import commentService from './commentService';

const initialState = {
  comment: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get comment
export const getAllComment = createAsyncThunk(
  'comment/getAll',
  async (_, thunkAPI) => {
    try {
      return await commentService.getAllComment();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comment = action.payload;
      })
      .addCase(getAllComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = commentSlice.actions;
export default commentSlice.reducer;
