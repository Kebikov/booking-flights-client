import { useDispatch, useSelector } from 'react-redux';
import { setCurentDataFlights } from '../redux/slice/sliceForm.js';
import { httpSQL } from '../service/http.service.js';
import * as Types from '../types.js'; // eslint-disable-line


const useGetAllFlights = () => {
    const dispatch = useDispatch();

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
            .get('/flights-data')
            .then(res => dispatch( setCurentDataFlights(res.data) ) )
            .catch(error => console.error(error));
    };
    
    return {
        updateAllFlights,
        curentDataFlights
    };
};

export default useGetAllFlights;

