import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const userRegister = createAsyncThunk(
  'userRegister',
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/signup', info);
      return data;
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default registerSlice.reducer;
