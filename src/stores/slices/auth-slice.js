import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  session: null,
  searchData: null,
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
    setSearch: (state, action) => {
      state.searchData = action.payload;
    },
    clearAuthSlice: () => initialState,
  },
});

export const { setUser, setSession, setSearch, clearAuthSlice } = AuthSlice.actions;
export default AuthSlice.reducer;