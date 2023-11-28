import { createSlice } from '@reduxjs/toolkit';
import '../../types.js'; 

const setFilter = (state, actions, filterName) => {
    // Сброс значений по умолчанию.
    if(actions.payload === 'RESET') {
        state[filterName] = {};
        return;
    }
    // Если передано значение для сортировки по больше/меньше, то выполняется.
    if(actions.payload?.moreLessId) {
        // Установка фильтраций по определенному столбцу больше/меньше.
        if(state[filterName]?.moreLessId === actions.payload.moreLessId) {
            state[filterName] = {...state[filterName], moreLessState: !state[filterName].moreLessState};
            return;
        } else {
            state[filterName] = {...state[filterName], moreLessId: actions.payload.moreLessId, moreLessState: true};
            return;
        }
    } else {
        // Установка значений для фильтрации.
        state[filterName] = {...state[filterName], ...actions.payload};
    }
};

/**
 * @typedef {Object} InitialState
 * @property {FlightsData} curentDataFlights - Тукушее загруженые обьекты  рейсов.
 * @property {FilterFlights} filterFlights - Обьект c данными, для фильтрации Flights.
 * @property {FilterBooking} filterBooking - Обьект c данными, для фильтрации Booking.
 * @property {BookingData} curentDataBooking - Тукушее загруженые обьекты Flights.
 * @property {FlightsData} curentDataFlights - Тукушее загруженые обьекты Booking.
 * @property {TotalAllPage} totalAllPageObj - Обьект с обшим количеством страниц Booking и Flights.
 * @property {number} totalLineInPage - Установленое количество отображаемых записей на странице за раз.
 * @property {number} currentPage - Установленый номер текушей просматриваемой страницы.
 */

/**
 * @type {InitialState}
 */
const initialState = {
    curentDataFlights: [],
    curentDataBooking: [], 

    filterFlights: {},
    filterBooking: {},

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
            if(actions.payload === 'DEFAULT_VALUE_CURRENT_PAGE') {
                state.currentPage = 1;
                return;
            }
            state.currentPage = actions.payload;
        },
        setTotalAllPage: (state, actions) => {
            state.totalAllPageObj = {...state.totalAllPageObj, ...actions.payload};
        },
        setFilterFlights: (state, actions) => {
            setFilter(state, actions, 'filterFlights');
        },
        setFilterBooking: (state, actions) => {
            setFilter(state, actions, 'filterBooking');
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
    setTotalAllPage,
    setFilterFlights,
    setFilterBooking
} = actions;