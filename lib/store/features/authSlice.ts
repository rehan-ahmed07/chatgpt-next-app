import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { emailOrUsername: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('auth/login', credentials);
      // Token is handled by cookies
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('auth/logout');
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Logout failed';
    return rejectWithValue(errorMessage);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      // Token removal handled by backend
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
      builder
        .addCase(logoutUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(logoutUser.fulfilled, (state) => {
          state.loading = false;
          state.isAuthenticated = false;
          state.user = null;
        })
        .addCase(logoutUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
  },
});

// Handle logout asyncThunk in a small extra reducer block to avoid changing original builder chain
authSlice.reducer;


export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;