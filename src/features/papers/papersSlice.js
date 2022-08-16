import { createSlice } from "@reduxjs/toolkit";

let idCounter = 17;
const initialState = [
  {
    id: 1,
    authorId: 1,
    type: "chapitre",
    releaseDate: "2022-01-01",
    title: "Titre papier",
    pageLink: "#",
    status: "valide",
    coauthorsId: [],
  },
  {
    id: 2,
    authorId: 2,

    type: "communication",
    releaseDate: "2022-01-02",
    title: "Titre communication",
    pageLink: "#",
    status: "rejected",
    coauthorsId: [],
  },
  {
    id: 3,
    authorId: 3,
    type: "workshop",
    releaseDate: "2022-01-03",
    title: "Titre workshop",
    pageLink: "#",
    status: "pending",
    coauthorsId: [2, 3],
  },
  {
    id: 4,
    authorId: 4,
    type: "workshop",
    releaseDate: "2022-01-04",
    title: "Titre workshop",
    pageLink: "#",
    status: "pending",
    coauthorsId: [2, 3, 4],
  },
  {
    id: 5,
    authorId: 1,
    type: "revue",
    releaseDate: "2022-01-05",
    title: "Titre papier",
    pageLink: "#",
    status: "pending",
    coauthorsId: [],
  },
  {
    id: 6,
    authorId: 2,
    type: "communication",
    releaseDate: "2022-01-06",
    title: "Titre communication",
    pageLink: "#",
    status: "rejected",
    coauthorsId: [],
  },
  {
    id: 7,
    authorId: 5,
    type: "revue",
    releaseDate: "2022-01-07",
    title: "Titre revue",
    pageLink: "#",
    status: "pending",
    coauthorsId: [],
  },
  {
    id: 8,
    authorId: 4,
    type: "revue",
    releaseDate: "2022-01-08",
    title: "Titre revue",
    pageLink: "#",
    status: "valide",
    coauthorsId: [],
  },
  {
    id: 9,
    authorId: 1,
    type: "chapitre",
    releaseDate: "2022-01-09",
    title: "Titre papier",
    pageLink: "#",
    status: "valide",
    coauthorsId: [],
  },
  {
    id: 10,
    authorId: 2,
    type: "communication",
    releaseDate: "2022-01-10",
    title: "Titre communication",
    pageLink: "#",
    status: "rejected",
    coauthorsId: [],
  },
  {
    id: 11,
    authorId: 3,
    type: "workshop",
    releaseDate: "2022-01-11",
    title: "Titre workshop",
    pageLink: "#",
    status: "pending",
    coauthorsId: [],
  },
  {
    id: 12,
    authorId: 4,
    type: "workshop",
    releaseDate: "2022-01-12",
    title: "Titre workshop",
    pageLink: "#",
    status: "pending",
    coauthorsId: [],
  },
  {
    id: 13,
    authorId: 1,
    type: "revue",
    releaseDate: "2022-01-13",
    title: "Titre papier",
    pageLink: "#",
    status: "pending",
    coauthorsId: [],
  },
  {
    id: 14,
    authorId: 2,
    type: "communication",
    releaseDate: "2022-01-14",
    title: "Titre communication",
    pageLink: "#",
    status: "rejected",
    coauthorsId: [],
  },
  {
    id: 15,
    authorId: 5,
    type: "revue",
    releaseDate: "2022-01-15",
    title: "Titre revue",
    pageLink: "#",
    status: "pending",
    coauthorsId: [],
  },
  {
    id: 16,
    authorId: 4,
    type: "revue",
    releaseDate: "2022-01-16",
    title: "Titre revue",
    pageLink: "#",
    status: "valide",
    coauthorsId: [],
  },
];
initialState.sort((a, b) =>
  Date(a.releaseDate) < Date(b.releaseDate) ? 1 : -1
);

const papersSlice = createSlice({
  name: "papers",
  initialState,
  reducers: {
    addPaper: (state, { payload }) => {
      payload.id = idCounter;
      idCounter++;
      const date = new Date();
      payload.releaseDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      payload.status = "pending";
      payload.pageLink = "#";
      state.push(payload);
      state.sort((a, b) =>
        Date(a.releaseDate) < Date(b.releaseDate) ? 1 : -1
      );
    },
  },
});

export const { addPaper } = papersSlice.actions;

export default papersSlice.reducer;
