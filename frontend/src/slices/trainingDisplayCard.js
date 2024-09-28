import { createSlice } from "@reduxjs/toolkit";

export const trainingDisplayCards = createSlice({
    name: 'anyInputIsEmpty',
    initialState:{
        anyInputIsEmpty: false,
    },
    reducers:{
        setAnyInputIsEmpty: (state, action) => {
            state.anyInputIsEmpty = action.payload;
        },
    }
})

export const { setAnyInputIsEmpty } = trainingDisplayCards.actions;
export default trainingDisplayCards.reducer
