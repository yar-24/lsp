import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import madingService from './madingService';

const initialState = {
  mading: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new Mading
export const createMading = createAsyncThunk(
  'mading/create',
  async (madingData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.user.token;
      return await madingService.createMading(madingData, token);
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

// Get Mading
export const getMading = createAsyncThunk(
  'mading/get',
  async (madingId, madingData, thunkAPI) => {
    try {
      return await madingService.getMading(madingId, madingData);
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

// Get mading
export const getAllMading = createAsyncThunk(
  'mading/getAll',
  async (_, thunkAPI) => {
    try {
      return await madingService.getAllMading();
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

// Delete user goal
export const deleteMading = createAsyncThunk(
  'mading/delete',
  async (madingId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.user.token;
      return await madingService.deleteMading(madingId, token);
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

export const madingSlice = createSlice({
  name: 'mading',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMading.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMading.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mading.madings = action.payload;
      })
      .addCase(createMading.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMading.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMading.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mading = action.payload;
      })
      .addCase(getMading.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllMading.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMading.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mading = action.payload;
      })
      .addCase(getAllMading.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteMading.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMading.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mading.mading = state.mading.mading.filter(
          (content) => content._id !== action.payload.madingId
        );
      })
      .addCase(deleteMading.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = madingSlice.actions;
export default madingSlice.reducer;
