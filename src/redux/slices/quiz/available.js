import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { logOut } from '../users/login';

export const getAvailableQuizzes = createAsyncThunk(
  'getAvailableQuizzes',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/quiz');
      return data;
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        if (error.response.data.message === 'مستخدم غير موثوق') {
          thunkAPI.dispatch(logOut());
        }
        return thunkAPI.rejectWithValue(error.response.data.message);
      }

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const getAvailableQuizSlice = createSlice({
  name: 'availableQuizzes',
  initialState: {
    quizzes: [],
  },

  extraReducers: (builder) => {
    builder.addCase(getAvailableQuizzes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAvailableQuizzes.fulfilled, (state, action) => {
      state.loading = false;
      state.quizzes = action.payload;
    });
    builder.addCase(getAvailableQuizzes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default getAvailableQuizSlice.reducer;
