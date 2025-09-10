import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
  allReviews: [],
};

export const ReviewSlice = createSlice({
  name: "ReviewSlice",
  initialState,
  reducers: {
    setReview: (state, action) => {
      state.reviews = action.payload;
    },
    setAllReviews: (state, action) => {
      state.allReviews = action.payload;
    },
  },
});

export const { setReview, setAllReviews } = ReviewSlice.actions;
export default ReviewSlice.reducer;