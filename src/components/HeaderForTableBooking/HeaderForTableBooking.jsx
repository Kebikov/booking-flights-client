import '../../scss/public.scss';
import { setFilterData } from '../../redux/slice/sliceForm';
import { useDispatch } from 'react-redux';

/**
* COMPONENT > имена столбцов в таблице Booking
* - РЕЙС / ФАМИЛИЯ / ИМЯ / ... 
* @component
* @example
* Пример использования компонента <HeaderForTableBooking/>:
* <HeaderForTableBooking/>
*/
//= HeaderForTableBooking 
const HeaderForTableBooking = () => {

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
            <th className="cursor" scope="col" data-id="surname" onClick={filter} >
                ФАМИЛИЯ
            </th>
            <th className="cursor" scope="col" data-id="name" onClick={filter} >
                ИМЯ
            </th>
            <th className="cursor" scope="col" data-id="middleName" onClick={filter} >
                ОТЧЕСТВО
            </th>
            <th className="cursor" scope="col" data-id="date" onClick={filter} >
                ДАТА БРОНИ
            </th>
            <th className="cursor" scope="col" data-id="sit" onClick={filter} >
                № МЕСТА
            </th>
            <th scope="col" >
                ПРИМЕЧАНИЯ
            </th>
        </tr>
    );
};

export default HeaderForTableBooking;