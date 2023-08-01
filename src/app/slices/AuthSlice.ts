import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface authInitialState {
  name: any;
  userInfo:
    | undefined
    | {
        uid: string;
        email: string;
        name: string;
      };
  isDarkTheme: boolean;
}

const initialState: authInitialState = {
  userInfo: undefined,
  isDarkTheme: false,
  name: undefined
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<authInitialState>) => {
      state.isDarkTheme = action.payload.isDarkTheme;
    },
    setUser: (
      state,
      action: PayloadAction<{
        uid: string;
        email: string;
        name: string;
      }>
    ) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUser, changeTheme } = authSlice.actions;
