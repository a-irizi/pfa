import { createSlice } from "@reduxjs/toolkit";
import profile from "../../images/profiles/avatar-1.jpg";

const initialState = 1;
// firstName: "John",
// lastName: "Doe",
// email: "johndoe@example.com",
// profile: profile,
// pageLink: "#",
// type: "professor",
// previouslyWorkedWith: [3]

const userSlice = createSlice({
  name: "userId",
  initialState,
});

export default userSlice.reducer;
