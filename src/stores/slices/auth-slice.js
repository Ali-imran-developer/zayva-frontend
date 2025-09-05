import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  session: null,
};

export const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSession: (state, action) => {
      state.session = action.payload;
    },
    clearAuthSlice: () => initialState,
  },
});

export const { setUser, setSession, clearAuthSlice } = AuthSlice.actions;
export default AuthSlice.reducer;