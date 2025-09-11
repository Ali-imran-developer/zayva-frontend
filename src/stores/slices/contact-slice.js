import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contactList: [],
};

export const ContactSlice = createSlice({
  name: "ContactSlice",
  initialState,
  reducers: {
    setContact: (state, action) => {
      state.contactList = action.payload;
    },
  },
});

export const { setContact } = ContactSlice.actions;
export default ContactSlice.reducer;