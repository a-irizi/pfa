import { configureStore } from "@reduxjs/toolkit";
import newPaperReducer from "./features/newPaper/newPaperSlice"
import papersReducer from "./features/papers/papersSlice"
import researchersReducer from "./features/researchers/researchersSlice";
import userReducer from "./features/user/userSlice";

export const store = configureStore({
    reducer: {
        newPaper: newPaperReducer,
        papers: papersReducer,
        researchers: researchersReducer,
        userId: userReducer,
    }
})