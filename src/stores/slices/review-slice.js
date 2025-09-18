import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
  allReviews: [],
  userReviews: [],
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
    setUserReviews: (state, action) => {
      state.userReviews = action.payload;
    },
  },
});

export const { setReview, setAllReviews, setUserReviews } = ReviewSlice.actions;
export default ReviewSlice.reducer;