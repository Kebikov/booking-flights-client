import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    curentDataFlights: []
};

const sliceForm = createSlice({
    name: 'sliceForm',
    initialState,
    reducers: {
        setCurentDataFlights: (state, actions) => {
            state.curentDataFlights = actions.payload;
        }
    }
});

const {reducer, actions} = sliceForm;

export default reducer;

export const {
    setCurentDataFlights
} = actions;