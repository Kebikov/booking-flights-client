import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    curentDataFlights: [],
    curentDataBooking: []
};

const sliceForm = createSlice({
    name: 'sliceForm',
    initialState,
    reducers: {
        setCurentDataFlights: (state, actions) => {
            state.curentDataFlights = actions.payload;
        },
        setCurentDataBooking: (state, actions) => {
            state.curentDataBooking = actions.payload;
        }
    }
});

const {reducer, actions} = sliceForm;

export default reducer;

export const {
    setCurentDataFlights,
    setCurentDataBooking
} = actions;