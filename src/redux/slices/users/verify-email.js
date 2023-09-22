import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const verifyUserEmail = createAsyncThunk(
  'verifyUserEmail',
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `/users/${info.id}/verify/${info.token}`
      );
      return data;
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const verifyEmailSlice = createSlice({
  name: 'verifyEmail',
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(verifyUserEmail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(verifyUserEmail.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
    builder.addCase(verifyUserEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default verifyEmailSlice.reducer;
