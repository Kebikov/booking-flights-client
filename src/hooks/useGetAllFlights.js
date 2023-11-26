import { useDispatch, useSelector } from 'react-redux';
import { setCurentDataFlights, setTotalAllPage } from '../redux/slice/sliceForm.js';
import { httpSQL } from '../service/http.service.js';
import delayFnc from '../helpers/delay.js';
import { useEffect, useRef } from 'react';
import '../types.js';


const useGetAllFlights = () => {

    const dispatch = useDispatch();
    // первый ли это рендер компонента
    const isFirstRender = useRef(true);

    const filterDataFlights = useSelector(state => state.sliceForm.filterDataFlights);
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
        httpSQL
            .post(`/flights-data?total=${totalLineInPage}&page=${currentPage}`, {...filterDataFlights})
            .then(res => {
                dispatch( setCurentDataFlights(res.data.dataFlights) );
                dispatch( setTotalAllPage({flights: res.data.totalPages}) );
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        if(!isFirstRender.current) {
            delayFnc(updateAllFlights, 1000);
        } else {
            isFirstRender.current = false;
        }
    },[filterDataFlights]); // eslint-disable-line 
    
    return {
        updateAllFlights,
        curentDataFlights
    };
};

export default useGetAllFlights;

