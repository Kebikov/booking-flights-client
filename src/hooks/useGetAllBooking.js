import '../types.js';
import { useDispatch, useSelector } from 'react-redux';
import { setCurentDataBooking, setTotalAllPage } from '../redux/slice/sliceForm.js';
import { httpSQL } from '../service/http.service.js';
import { useRef, useEffect } from 'react';
import delayFnc from '../helpers/delay.js';



/**
 * @returns {UseGetAllBooking}
 */
const useGetAllBooking = () => {
    const dispatch = useDispatch();

    // первый ли это рендер компонента
    const isFirstRender = useRef(true);

    /**
     * Обьект с данными для сортировки в таблице.
     * @type {FilterData}
     */
    const filterBooking = useSelector(state => state.sliceForm.filterBooking);
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
     * @type {BookingData[]}
     */
    const curentDataBooking = useSelector(state => state.sliceForm.curentDataBooking);

    /**
     * Function обновления глобального состояния с данными брони.
     */
    const updateAllBooking = () => {
        console.log('updateAllBooking');
        httpSQL
            .post(`/filter-data/booking?total=${totalLineInPage}&page=${currentPage}`, {...filterBooking})
            .then(res => {
                dispatch( setCurentDataBooking(res.data.data) );
                dispatch( setTotalAllPage({booking: res.data.totalPages}) );
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        if(!isFirstRender.current) {
            delayFnc(updateAllBooking, 500);
        } else {
            isFirstRender.current = false;
        }
    },[filterBooking]); // eslint-disable-line

    return {
        updateAllBooking,
        curentDataBooking
    };
};

export default useGetAllBooking;

