import { useDispatch, useSelector } from 'react-redux';
import { setCurentDataFlights, setTotalAllPage } from '../redux/slice/sliceForm.js';
import { httpSQL } from '../service/http.service.js';
import delayFnc from '../helpers/delay/delay.js';
import { useEffect, useRef } from 'react';
import '../types.js';


const useGetAllFlights = () => {

    const dispatch = useDispatch();
    // первый ли это рендер компонента
    const isFirstRender = useRef(true);

    /**
     * Обьект с данными для сортировки в таблице.
     * @type {FilterData}
     */
    const filterFlights = useSelector(state => state.sliceForm.filterFlights);
    /**
     * Установленое количество отображаемых записей.
     * @type {number}
     */
    const totalLineInPage = useSelector(state => state.sliceForm.totalLineInPage);
    /**
     * Номер текушей просматриваемой страницы.
     * @type {number} currentPage
     */
    const currentPage = useSelector(state => state.sliceForm.currentPage); 
    /**
     * Глобольный массив обьектов с данными рейсов.
     * @type {FlightsData[]}
     */
    const curentDataFlights = useSelector(state => state.sliceForm.curentDataFlights);

    /**
     * Function обновления глобального состояния с данными рейсов.
     */
    const updateAllFlights = () => {
        console.log('updateAllBooking');
        httpSQL
            .post(`/filter-data/flights?total=${totalLineInPage}&page=${currentPage}`, {...filterFlights})
            .then(res => {
                dispatch( setCurentDataFlights(res.data.data) );
                dispatch( setTotalAllPage({flights: res.data.totalPages}) );
            })
            .catch(error => console.error(error));
    };
    

    useEffect(() => {
        if(!isFirstRender.current) {
            delayFnc(updateAllFlights, 500);
        } else {
            isFirstRender.current = false;
        }
    },[filterFlights]); // eslint-disable-line 

    
    return {
        updateAllFlights,
        curentDataFlights
    };
};

export default useGetAllFlights;

