import profile from "./images/profiles/avatar-1.jpg";
import coauthor1 from "./images/profiles/avatar-2.jpg";
import coauthor2 from "./images/profiles/avatar-3.jpg";
import coauthor3 from "./images/profiles/avatar-5.jpg";
import coauthor4 from "./images/profiles/avatar-6.jpg";

export default [
  {
    id: 1,
    author: {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      profile: profile,
      pageLink: "#",
      type: "professor",
    },
    type: "chapitre d'ouvrage",
    releaseDate: "2022-01-01",
    title: "Titre papier",
    pageLink: "#",
    status: "valide",
    coauthors: [
      {
        profile: coauthor1,
        pageLink: "#",
      },
      {
        profile: coauthor2,
        pageLink: "#",
      },
      {
        profile: coauthor3,
        pageLink: "#",
      },
      {
        profile: coauthor4,
        pageLink: "#",
      },
    ],
  },
  {
    id: 2,
    author: {
      firstName: "John",
      lastName: "Shmoe",
      email: "johnshmoe@example.com",
      profile: coauthor1,
      pageLink: "#",
      type: "student",
    },
    type: "communication internationalle",
    releaseDate: "2022-01-02",
    title: "Titre communication",
    pageLink: "#",
    status: "rejected",
  },
  {
    id: 3,
    author: {
      firstName: "Johnaten",
      lastName: "Donaten the third",
      email: "JohnatenDonaten@example.com",
      profile: coauthor3,
      pageLink: "#",
      type: "professor",
    },
    type: "workshop internationalle",
    releaseDate: "2022-01-01",
    title: "Titre workshop",
    pageLink: "#",
    status: "pending",
    coauthors: [
      {
        profile: coauthor1,
        pageLink: "#",
      },
      {
        profile: coauthor2,
        pageLink: "#",
      },
    ],
  },
  {
    id: 4,
    author: {
      firstName: "Jane",
      lastName: "Dane",
      email: "janedane@example.com",
      profile: coauthor4,
      pageLink: "#",
      type: "student",
    },
    type: "workshop internationalle",
    releaseDate: "2022-01-01",
    title: "Titre workshop",
    pageLink: "#",
    status: "pending",
    coauthors: [
      {
        profile: coauthor1,
        pageLink: "#",
      },
      {
        profile: coauthor2,
        pageLink: "#",
      },
      {
        profile: coauthor3,
        pageLink: "#",
      },
    ],
  },
  {
    id: 5,
    author: {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      profile: profile,
      pageLink: "#",
      type: "professor",
    },
    type: "revue international",
    releaseDate: "2022-01-01",
    title: "Titre papier",
    pageLink: "#",
    status: "pending",
    coauthors: [
      {
        profile: coauthor1,
        pageLink: "#",
      },
      {
        profile: coauthor2,
        pageLink: "#",
      },
      {
        profile: coauthor3,
        pageLink: "#",
      },
      {
        profile: coauthor4,
        pageLink: "#",
      },
    ],
  },
  {
    id: 6,
    author: {
      firstName: "John",
      lastName: "Shmoe",
      email: "johnshmoe@example.com",
      profile: coauthor1,
      pageLink: "#",
      type: "student",
    },
    type: "communication internationalle",
    releaseDate: "2022-01-02",
    title: "Titre communication",
    pageLink: "#",
    status: "rejected",
  },
  {
    id: 7,
    author: {
      firstName: "Johnaten",
      lastName: "Donaten",
      email: "JohnatenDonaten@example.com",
      profile: coauthor3,
      pageLink: "#",
      type: "professor",
    },
    type: "revue international",
    releaseDate: "2022-01-01",
    title: "Titre revue",
    pageLink: "#",
    status: "pending",
    coauthors: [
      {
        profile: coauthor1,
        pageLink: "#",
      },
      {
        profile: coauthor2,
        pageLink: "#",
      },
    ],
  },
  {
    id: 8,
    author: {
      firstName: "Jane",
      lastName: "Dane",
      email: "janedane@example.com",
      profile: coauthor4,
      pageLink: "#",
      type: "student",
    },
    type: "revue international",
    releaseDate: "2022-01-01",
    title: "Titre revue",
    pageLink: "#",
    status: "valide",
    coauthors: [
      {
        profile: coauthor1,
        pageLink: "#",
      },
      {
        profile: coauthor2,
        pageLink: "#",
      },
      {
        profile: coauthor3,
        pageLink: "#",
      },
    ],
  },
  {
    id: 1,
    author: {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      profile: profile,
      pageLink: "#",
      type: "professor",
    },
    type: "chapitre d'ouvrage",
    releaseDate: "2022-01-01",
    title: "Titre papier",
    pageLink: "#",
    status: "valide",
    coauthors: [
      {
        profile: coauthor1,
        pageLink: "#",
      },
      {
        profile: coauthor2,
        pageLink: "#",
      },
      {
        profile: coauthor3,
        pageLink: "#",
      },
      {
        profile: coauthor4,
        pageLink: "#",
      },
    ],
  },
  {
    id: 2,
    author: {
      firstName: "John",
      lastName: "Shmoe",
      email: "johnshmoe@example.com",
      profile: coauthor1,
      pageLink: "#",
      type: "student",
    },
    type: "communication internationalle",
    releaseDate: "2022-01-02",
    title: "Titre communication",
    pageLink: "#",
    status: "rejected",
  },
  {
    id: 3,
    author: {
      firstName: "Johnaten",
      lastName: "Donaten the third",
      email: "JohnatenDonaten@example.com",
      profile: coauthor3,
      pageLink: "#",
      type: "professor",
    },
    type: "workshop internationalle",
    releaseDate: "2022-01-01",
    title: "Titre workshop",
    pageLink: "#",
    status: "pending",
    coauthors: [
      {
        profile: coauthor1,
        pageLink: "#",
      },
      {
        profile: coauthor2,
        pageLink: "#",
      },
    ],
  },
  {
    id: 4,
    author: {
      firstName: "Jane",
      lastName: "Dane",
      email: "janedane@example.com",
      profile: coauthor4,
      pageLink: "#",
      type: "student",
    },
    type: "workshop internationalle",
    releaseDate: "2022-01-01",
    title: "Titre workshop",
    pageLink: "#",
    status: "pending",
    coauthors: [
      {
        profile: coauthor1,
        pageLink: "#",
      },
      {
        profile: coauthor2,
        pageLink: "#",
      },
      {
        profile: coauthor3,
        pageLink: "#",
      },
    ],
  },
  {
    id: 5,
    author: {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      profile: profile,
      pageLink: "#",
      type: "professor",
    },
    type: "revue international",
    releaseDate: "2022-01-01",
    title: "Titre papier",
    pageLink: "#",
    status: "pending",
    coauthors: [
      {
        profile: coauthor1,
        pageLink: "#",
      },
      {
        profile: coauthor2,
        pageLink: "#",
      },
      {
        profile: coauthor3,
        pageLink: "#",
      },
      {
        profile: coauthor4,
        pageLink: "#",
      },
    ],
  },
  {
    id: 6,
    author: {
      firstName: "John",
      lastName: "Shmoe",
      email: "johnshmoe@example.com",
      profile: coauthor1,
      pageLink: "#",
      type: "student",
    },
    type: "communication internationalle",
    releaseDate: "2022-01-02",
    title: "Titre communication",
    pageLink: "#",
    status: "rejected",
  },
  {
    id: 7,
    author: {
      firstName: "Johnaten",
      lastName: "Donaten",
      email: "JohnatenDonaten@example.com",
      profile: coauthor3,
      pageLink: "#",
      type: "professor",
    },
    type: "revue international",
    releaseDate: "2022-01-01",
    title: "Titre revue",
    pageLink: "#",
    status: "pending",
    coauthors: [
      {
        profile: coauthor1,
        pageLink: "#",
      },
      {
        profile: coauthor2,
        pageLink: "#",
      },
    ],
  },
  {
    id: 8,
    author: {
      firstName: "Jane",
      lastName: "Dane",
      email: "janedane@example.com",
      profile: coauthor4,
      pageLink: "#",
      type: "student",
    },
    type: "revue international",
    releaseDate: "2022-01-01",
    title: "Titre revue",
    pageLink: "#",
    status: "valide",
    coauthors: [
      {
        profile: coauthor1,
        pageLink: "#",
      },
      {
        profile: coauthor2,
        pageLink: "#",
      },
      {
        profile: coauthor3,
        pageLink: "#",
      },
    ],
  },
];
