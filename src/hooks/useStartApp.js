import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useGetAllBooking from './useGetAllBooking.js';
import useGetAllFlights from './useGetAllFlights.js';

/**
 * Hook установки начального состояния.
 */
const useStartApp = () => {

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

    const {updateAllFlights} = useGetAllFlights();
    const {updateAllBooking} = useGetAllBooking();

    useEffect(() => {
        // получение в глобальное состояние всех рейсов 
        updateAllFlights();
        // получение в глобальное состояние всей брони
        updateAllBooking();
    },[totalLineInPage, currentPage]); // eslint-disable-line 

};

export default useStartApp;
