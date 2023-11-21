import { useDispatch, useSelector } from 'react-redux';
import { setCurentDataBooking } from '../redux/slice/sliceForm.js';
import { httpSQL } from '../service/http.service.js';
import * as Types from '../types.js'; // eslint-disable-line


const useGetAllBooking = () => {
    const dispatch = useDispatch();

    /**
     * curentDataBooking
     * - Массив обьектов с данными бронирования.
     * @type {Types.BookingData[]}
     */
    const curentDataBooking = useSelector(state => state.sliceForm.curentDataBooking);

    const updateAllBooking = () => {
        httpSQL
            .get('/booking-data')
            .then(res => dispatch( setCurentDataBooking(res.data) ))
            .catch(error => console.error(error));
    };
    
    return {
        updateAllBooking,
        curentDataBooking
    };
};

export default useGetAllBooking;

