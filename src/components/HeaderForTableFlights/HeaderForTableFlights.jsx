import '../../scss/public.scss';
import { setFilterData } from '../../redux/slice/sliceForm';
import { useDispatch } from 'react-redux';

/**
* COMPONENT > имена столбцов в таблице Flights
* - РЕЙС / ГОРОД(АЭРОПОРТ) / ДАТА И ВРЕМЯ / ... 
* @component
* @example
* Пример использования компонента <HeaderForTableFlights/>:
* <HeaderForTableBooking/>
*/
//= HeaderForTableFlights 
const HeaderForTableFlights = () => {

    const dispatch = useDispatch();

    const filter = (event) => {
        const moreLessId = event.target.getAttribute('data-id');
        dispatch( setFilterData({moreLessId}) );
    };

    return(
        <tr>
            <th className="cursor" scope="col" data-id="route" onClick={filter} >
                РЕЙС
            </th>
            <th className="cursor" scope="col" data-id="city" onClick={filter} >
                ГОРОД(АЭРОПОРТ)
            </th>
            <th className="cursor" scope="col" data-id="date" onClick={filter} >
                ДАТА И ВРЕМЯ
            </th>
            <th className="cursor" scope="col" data-id="company" onClick={filter} >
                АВИАКОМПАНИЯ
            </th>
            <th className="cursor" scope="col" data-id="checkIn" onClick={filter} >
                РЕГИСТРАЦИЯ ДО
            </th>
            <th className="cursor" scope="col" data-id="freePlace" onClick={filter} >
                КОЛ-ВО МЕСТ*
            </th>
            <th scope="col" >
                ПРИМЕЧАНИЯ
            </th>
        </tr>
    );
};

export default HeaderForTableFlights;