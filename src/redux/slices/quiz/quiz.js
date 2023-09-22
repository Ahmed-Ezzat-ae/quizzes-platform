import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { logOut } from '../users/login';

export const getQuiz = createAsyncThunk(
  'getQuiz',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`/quiz/${id}`);
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

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    questions: [],
  },

  extraReducers: (builder) => {
    builder.addCase(getQuiz.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getQuiz.fulfilled, (state, action) => {
      state.loading = false;
      state.questions = action.payload.questions;
    });
    builder.addCase(getQuiz.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default quizSlice.reducer;
