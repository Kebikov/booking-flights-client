import { configureStore } from '@reduxjs/toolkit';
import sliceForm from './slice/sliceForm.js';


const store = configureStore({
    reducer: {sliceForm},
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;