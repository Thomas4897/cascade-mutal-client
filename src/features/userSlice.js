import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: "",
    email: "",
    firstName: "",
    lastName: "",
  },
  reducers: {
    addUserId: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.userId = action.payload;
      console.log(action);
    },
    deleteUserId: (state) => {
      state.userId = "";
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    resetState: (state) => {
      state.userId = "";
      state.email = "";
      state.firstName = "";
      state.lastName = "";
    },
  },
});

export const selectUserId = (state) => state.user.userId;
export const selectUserEmail = (state) => state.user.email;
export const selectUserFirstName = (state) => state.user.firstName;
export const selectUserLastName = (state) => state.user.lastName;

export const {
  addUserId,
  deleteUserId,
  setEmail,
  setFirstName,
  setLastName,
  resetState,
} = userSlice.actions;

export default userSlice.reducer;
