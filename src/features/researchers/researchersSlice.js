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
    type: "student",
    supervisorId: 3,

    previouslyWorkedWith: [3],
    lastWorkId: 13,
    status: "valid",
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Shmoe",
    email: "johnshmoe@example.com",
    profile: coauthor1,
    pageLink: "#",
    type: "student",
    supervisorId: 1,
    previouslyWorkedWith: [4, 5],
    lastWorkId: 14,
    status: "rejected",
  },
  {
    id: 3,
    firstName: "Johnaten",
    lastName: "Donaten the third",
    email: "JohnatenDonatenthethird@example.com",
    profile: coauthor2,
    pageLink: "#",
    type: "professor",
    previouslyWorkedWith: [1],
    lastWorkId: 11,
    status: "pending",
  },
  {
    id: 4,
    firstName: "Jane",
    lastName: "Dane",
    email: "janedane@example.com",
    profile: coauthor3,
    pageLink: "#",
    type: "student",
    supervisorId: 3,
    previouslyWorkedWith: [2, 5],
    lastWorkId: 16,
    status: "valid",
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
    lastWorkId: 15,
    status: "valid",
  },
];

const researchersSlice = createSlice({
  name: "researchers",
  initialState,
  reducers: {
    updatePreviouslyWorkedWith: (state, { payload }) => {
      for (let i = 0; i < payload.length; i++) {
        const researcher = state.find((r) => r.id === payload[i]);
        const ids = [...payload].filter((id) => id !== researcher.id);
        ids.concat(researcher.previouslyWorkedWith);
        researcher.previouslyWorkedWith = [...new Set([...ids])];
      }
    },
    updateLastWork: (state, { payload }) => {
      const researcher = state.find((r) => r.id === payload.researcherId);
      researcher.lastWorkId = payload.lastWorkId;
    },
    updateResearcher: (state, { payload }) => {
      console.log("from updateResearcher");
      console.log(payload);
      const researcherId = state.findIndex((p) => p.id === payload.id);
      state.splice(researcherId, 1, payload);
    },
    validateResearcher: (state, { payload }) => {
      const Researcher = state.find((r) => r.id === payload);
      Researcher.status = "valid";
    },
    rejectResearcher: (state, { payload }) => {
      const Researcher = state.find((r) => r.id === payload);
      Researcher.status = "rejected";
    },
  },
});

export const {
  updatePreviouslyWorkedWith,
  updateLastWork,
  updateResearcher,
  validateResearcher,
  rejectResearcher,
} = researchersSlice.actions;

export default researchersSlice.reducer;
