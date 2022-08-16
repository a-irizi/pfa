import { createSlice } from "@reduxjs/toolkit";

import profile from "../../images/profiles/avatar-1.jpg";
import coauthor1 from "../../images/profiles/avatar-2.jpg";
import coauthor2 from "../../images/profiles/avatar-3.jpg";
import coauthor3 from "../../images/profiles/avatar-5.jpg";
import coauthor4 from "../../images/profiles/avatar-6.jpg";

const initialState = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    profile: profile,
    pageLink: "#",
    type: "professor",
    previouslyWorkedWith: [3],
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Shmoe",
    email: "johnshmoe@example.com",
    profile: coauthor1,
    pageLink: "#",
    type: "student",
    previouslyWorkedWith: [4, 5],
  },
  {
    id: 3,
    firstName: "Johnaten",
    lastName: "Donaten the third",
    email: "JohnatenDonaten@example.com",
    profile: coauthor2,
    pageLink: "#",
    type: "professor",
    previouslyWorkedWith: [1],
  },
  {
    id: 4,
    firstName: "Jane",
    lastName: "Dane",
    email: "janedane@example.com",
    profile: coauthor3,
    pageLink: "#",
    type: "student",
    previouslyWorkedWith: [2, 5],
  },
  {
    id: 5,
    firstName: "Johnaten",
    lastName: "Donaten",
    email: "JohnatenDonaten@example.com",
    profile: coauthor4,
    pageLink: "#",
    type: "professor",
    previouslyWorkedWith: [2, 4],
  },
];

const researchersSlice = createSlice({
  name: "researchers",
  initialState,
  reducers: {
    updatePreviouslyWorkedWith: (state, { payload }) => {
      console.log(payload);

      for (let i = 0; i < payload.length; i++) {
        const researcher = state.find((r) => r.id === payload[i]);
        const ids = [...payload].filter((id) => id !== researcher.id);
        ids.concat(researcher.previouslyWorkedWith);
        researcher.previouslyWorkedWith = [...new Set([...ids])];
      }
    },
  },
});

export const { updatePreviouslyWorkedWith } = researchersSlice.actions;

export default researchersSlice.reducer;
