import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from 'entities/User/model';
import { getUser } from 'entities/User/services/user.service.ts';

interface AuthenticatedState {
  isAuthenticated: true;
  user: User;
}

interface UnauthenticatedState {
  isAuthenticated: false;
  user: null;
}

type UserState = AuthenticatedState | UnauthenticatedState;

const unauthenticatedState: UnauthenticatedState = {
  isAuthenticated: false,
  user: null,
};

const sanitizeUser = (data: Partial<User>): User => ({
  id: data.id ?? 0,
  email: data.email ?? '',
  fullName: data.fullName ?? '',
  country: data.country ?? '',
  phoneNumber: data.phoneNumber ?? '',
  language: data.language ?? '',
});

export const updateUser = createAsyncThunk<User, void, { rejectValue: UnauthenticatedState }>(
  'user/updateUser',
  async (_, { rejectWithValue }) => {
    try {
      const dto = await getUser();
      return sanitizeUser(dto);
    } catch {
      return rejectWithValue(unauthenticatedState);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: unauthenticatedState as UserState,
  reducers: {
    logout: () => unauthenticatedState,
    setUser(state, action: PayloadAction<Partial<User>>) {
      state.isAuthenticated = true;
      state.user = sanitizeUser({
        ...action.payload,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.isAuthenticated = true;
        state.user = payload;
      })
      .addCase(updateUser.rejected, () => unauthenticatedState);
  },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;
