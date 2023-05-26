import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GlobalState } from '.';
import { RancherUserResponse } from '../models/user';

const initialState = Object.freeze<GlobalState['user']>({
  //
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<RancherUserResponse['data']>) {
      state.user = action.payload;
    },
  },
});
