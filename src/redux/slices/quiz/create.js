import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { logOut } from '../users/login';

export const createQuiz = createAsyncThunk(
  'createQuiz',
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.post('/quiz', info);
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

const createQuizSlice = createSlice({
  name: 'quiz',
  initialState: {},
    reducers: {
      clearCreateMsg: (state) => {
        return { ...state, message: '' };
      },
    },
  extraReducers: (builder) => {
    builder.addCase(createQuiz.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createQuiz.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(createQuiz.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {clearCreateMsg} = createQuizSlice.actions
export default createQuizSlice.reducer;
