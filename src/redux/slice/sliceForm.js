import { createSlice } from '@reduxjs/toolkit';
import '../../types.js'; 

/**
 * @typedef {Object} InitialState
 * @property {FlightsData} curentDataFlights - Тукушее загруженые обьекты  рейсов.
 * @property {FilterData} filterData - Обьект c данными, для фильтрации рейсов.
 * @property {BookingData} curentDataBooking - Тукушее загруженые обьекты  брони.
 * @property {TotalAllPage} totalAllPageObj - Обьект с обшим количеством страниц Booking и Flights.
 * @property {number} totalLineInPage - Установленое количество отображаемых записей на странице за раз.
 * @property {number} currentPage - Установленый номер текушей просматриваемой страницы.
 */

/**
 * @type {InitialState}
 */
const initialState = {
    curentDataFlights: [],
    filterData: {},
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
            if(actions.payload === 'DEFAULT_VALUE_CURRENT_PAGE') {
                state.currentPage = 1;
                return;
            }
            state.currentPage = actions.payload;
        },
        setTotalAllPage: (state, actions) => {
            state.totalAllPageObj = {...state.totalAllPageObj, ...actions.payload};
        },
        setFilterData: (state, actions) => {
            // Сброс значений по умолчанию.
            if(actions.payload === 'RESET') {
                state.filterData = {};
                return;
            }
            // Если передано значение для сортировки по больше/меньше, то выполняется.
            if(actions.payload?.moreLessId) {
                // Установка фильтраций по определенному столбцу больше/меньше.
                if(state.filterData?.moreLessId === actions.payload.moreLessId) {
                    state.filterData = {...state.filterData, moreLessState: !state.filterData.moreLessState};
                    return;
                } else {
                    state.filterData = {...state.filterData, moreLessId: actions.payload.moreLessId, moreLessState: true};
                    return;
                }
            } else {
                // Установка значений для фильтрации.
                state.filterData = {...state.filterData, ...actions.payload};
            }
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
    setFilterData
} = actions;