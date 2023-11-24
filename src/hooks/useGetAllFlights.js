import { useDispatch, useSelector } from 'react-redux';
import { setCurentDataFlights, setTotalAllPage } from '../redux/slice/sliceForm.js';
import { httpSQL } from '../service/http.service.js';
import * as Types from '../types.js'; // eslint-disable-line


const useGetAllFlights = () => {
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
     * Глобольный массив обьектов с данными рейсов.
     * @type {Types.FlightsData[]}
     */
    const curentDataFlights = useSelector(state => state.sliceForm.curentDataFlights);

    /**
     * Function обновления глобального состояния с данными рейсов.
     */
    const updateAllFlights = () => {
        httpSQL
            .get(`/flights-data?total=${totalLineInPage}&page=${currentPage}`)
            .then(res => {
                dispatch( setCurentDataFlights(res.data.dataFlights) );
                dispatch( setTotalAllPage({flights: res.data.totalPagesBooking}) );
            })
            .catch(error => console.error(error));
    };
    
    return {
        updateAllFlights,
        curentDataFlights
    };
};

export default useGetAllFlights;

