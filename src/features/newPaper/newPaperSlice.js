import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    author: "john doe",
    coauthors: [],
    title: "",
    date: "",
    index: "",
    
}

const newPaperSlice = createSlice({
    name: 'newPaperModal',
    initialState,
})

export default newPaperSlice.reducer;