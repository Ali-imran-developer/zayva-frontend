import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  featureImageList: [],
};

export const FeatureSlice = createSlice({
  name: "FeatureSlice",
  initialState,
  reducers: {
    setFeatures: (state, action) => {
      state.featureImageList = action.payload;
    },
  },
});

export const { setFeatures } = FeatureSlice.actions;
export default FeatureSlice.reducer;