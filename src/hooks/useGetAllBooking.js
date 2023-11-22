import { useDispatch, useSelector } from 'react-redux';
import { setCurentDataBooking, setTotalAllPage } from '../redux/slice/sliceForm.js';
import { httpSQL } from '../service/http.service.js';
import * as Types from '../types.js'; // eslint-disable-line



/**
 * @returns {Types.UseGetAllBooking}
 */
const useGetAllBooking = () => {
    const dispatch = useDispatch();

    /**
     * @type {number} totalLineInPage 
     * - Установленое количество отображаемых записей.
     */
    const totalLineInPage = useSelector(state => state.sliceForm.totalLineInPage);
    /**
     * @type {number} currentPage
     * - Номер текушей просматриваемой страницы.
     */
    const currentPage = useSelector(state => state.sliceForm.currentPage); 

    /**
     * curentDataBooking
     * - Глобольный массив обьектов с данными бронирования.
     * @type {Types.BookingData[]}
     */
    const curentDataBooking = useSelector(state => state.sliceForm.curentDataBooking);

    /**
     * Function обновления глобального состояния с данными брони.
     */
    const updateAllBooking = () => {
        httpSQL
            .get(`/booking-data?total=${totalLineInPage}&page=${currentPage}`)
            .then(res => {
                dispatch( setCurentDataBooking(res.data.rows) );
                dispatch( setTotalAllPage({booking: res.data.totalPagesBooking}) );
            })
            .catch(error => console.error(error));
    };
    
    return {
        updateAllBooking,
        curentDataBooking
    };
};

export default useGetAllBooking;

