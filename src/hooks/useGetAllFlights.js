import { useDispatch, useSelector } from 'react-redux';
import { setCurentDataFlights } from '../redux/slice/sliceForm.js';
import { httpSQL } from '../service/http.service.js';


const useGetAllFlights = () => {
    const dispatch = useDispatch();

    /**
    * @typedef {Object} FlightsData
    * @property {number} id - id рейса
    * @property {string} route - уникальное имя рейса
    * @property {string} city - город назначения
    * @property {string} date - дата и время вылета
    * @property {string} company - комания перевозчик
    * @property {string} checkIn - крайний срок регистрации на рейс
    * @property {number} freePlace - количество свободных мест в самолете
    * @property {string} note - примечание
    */

    /**
    * curentDataFlights 
    * - массив обьектов с данными рейсов
    * @type {FlightsData[]}
    */
    const curentDataFlights = useSelector(state => state.sliceForm.curentDataFlights);

    const updateAllFlights = () => {
        httpSQL
            .get('/flights-data')
            .then(res => {
                dispatch(setCurentDataFlights(res.data));
            })
            .catch(error => console.error(error));
    };
    
    return {
        updateAllFlights,
        curentDataFlights
    };
};

export default useGetAllFlights;

