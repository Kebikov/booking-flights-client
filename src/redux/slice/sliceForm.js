import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    formFlights: {}
};

const sliceForm = createSlice({
    name: 'sliceForm',
    initialState,
    reducers: {
        setReduxFormFlights: (state, actions) => {
            if(actions.payload === 'clian') {
                state.orderAdmin = {};
            }else{
                state.orderAdmin = {...state.orderAdmin, ...actions.payload};
            }
        }
    }
});

const {reducer, actions} = sliceForm;

export default reducer;

export const {
    setReduxFormFlights
} = actions;