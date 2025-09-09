import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
};

export const ReviewSlice = createSlice({
  name: "ReviewSlice",
  initialState,
  reducers: {
    setReview: (state, action) => {
      state.reviews = action.payload;
    },
  },
});

export const { setReview } = ReviewSlice.actions;
export default ReviewSlice.reducer;