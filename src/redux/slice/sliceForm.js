import { createSlice } from '@reduxjs/toolkit';
import * as Types from '../../types.js'; // eslint-disable-line



/**
 * @typedef {Object} InitialState
 * @property {Types.FlightsData} curentDataFlights - Тукушее загруженые обьекты  рейсов.
 * @property {Types.BookingData} curentDataBooking - Тукушее загруженые обьекты  брони.
 * @property {Types.TotalAllPage} totalAllPageObj - Обьект с обшим количеством страниц Booking и Flights.
 * @property {number} totalLineInPage - Установленое количество отображаемых записей на странице за раз.
 * @property {number} currentPage - Установленый номер текушей просматриваемой страницы.
 */

/**
 * @type {InitialState}
 */
const initialState = {
    curentDataFlights: [],
    curentDataBooking: [], 
    totalAllPageObj: {
        booking: 0,
        flights: 0
    },
    totalLineInPage: 5,
    currentPage: 1
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
        },
        setTotalLineInPage: (state, actions) => {
            state.totalLineInPage = actions.payload;
            state.currentPage = 1;
        },
        setCurrentPage: (state, actions) => {
            if(actions.payload === 'DEFAULT_VALUE') return state.currentPage = 1;
            state.currentPage = actions.payload;
        },
        setTotalAllPage: (state, actions) => {
            state.totalAllPageObj = {...state.totalAllPageObj, ...actions.payload};
        }
    }
});

const {reducer, actions} = sliceForm;

export default reducer;

export const {
    setCurentDataFlights,
    setCurentDataBooking,
    setTotalLineInPage,
    setCurrentPage,
    setTotalAllPage
} = actions;