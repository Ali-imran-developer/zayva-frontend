import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogList: [],
  blogDetails: null,
};

export const BlogSlice = createSlice({
  name: "BlogSlice",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogList = action.payload;
    },
    setBlogsDetail: (state, action) => {
      state.blogDetails = action.payload;
    },
  },
});

export const { setBlogs, setBlogsDetail } = BlogSlice.actions;
export default BlogSlice.reducer;