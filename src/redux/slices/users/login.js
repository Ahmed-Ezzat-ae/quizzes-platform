import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const userLogin = createAsyncThunk(
  'userLogin',
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/signin', info);
      return data;
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    userData: JSON.parse(localStorage.getItem('userInfo')) || {},
  },
  reducers: {
    clearLoginMsg: (state) => {
      return { ...state, message: '' };
    },

    logOut: (state) => {
      localStorage.removeItem('userInfo');
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;

      state.message = action.payload.message;
      localStorage.setItem(
        'userInfo',
        JSON.stringify({ ...action.payload.user, token: action.payload.token })
      );
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearLoginMsg, logOut } = loginSlice.actions;
export default loginSlice.reducer;
