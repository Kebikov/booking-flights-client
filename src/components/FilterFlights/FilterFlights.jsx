import '../../page/Booking/booking.scss';
import './filterFlights.scss';
import '../../types';
import { setFilterDataFlights } from '../../redux/slice/sliceForm';
import { useDispatch, useSelector } from 'react-redux';


/**
 * COMPONENT > Блок в верху таблицы для установки фильтрации данных.
 * @component
 * @example
 * <FilterFlights/>
 */
//= FilterFlights 
const FilterFlights = () => {

    const dispatch = useDispatch();
    const filterDataFlights = useSelector(state => state.sliceForm.filterDataFlights);

    const filter = (event) => {
        const target = event.target;
        const id = target.id;
        const value = target.value;

        dispatch( setFilterDataFlights({[id]: value}) );
    };
    // Сброс значений по умолчанию.
    const reset = () => {
        dispatch( setFilterDataFlights('RESET') );
    };

    return(
        <tr>
            <th scope="col">
                <input 
                    id="route" 
                    value={filterDataFlights.route}
                    onChange={filter} 
                    className="table-input" 
                    type="text" 
                    autoComplete="off"
                />
            </th>
            <th scope="col">
                <input 
                    id="city" 
                    value={filterDataFlights.city}
                    onChange={filter} 
                    className="table-input" 
                    type="text" 
                    autoComplete="off"
                />
            </th>
            <th scope="col">
                <input 
                    id="date" 
                    value={filterDataFlights.date}
                    onChange={filter} 
                    className="table-input" 
                    type="date" 
                    autoComplete="off"
                />
            </th>
            <th scope="col">
                <input 
                    id="company" 
                    value={filterDataFlights.company}
                    onChange={filter} 
                    className="table-input" 
                    type="text" 
                    autoComplete="off"
                />
            </th>
            <th scope="col">
                <input 
                    id="checkIn" 
                    value={filterDataFlights.checkIn}
                    onChange={filter} 
                    className="table-input" 
                    type="date" 
                    autoComplete="off"
                />
            </th>
            <th scope="col">
                <input 
                    id="freePlace" 
                    value={filterDataFlights.freePlace}
                    onChange={filter} 
                    className="table-input" 
                    type="number" 
                    autoComplete="off"
                />
            </th>
            <th scope="col" className="th_reset">
                <button onClick={reset} type="button" className="reset">сброс</button>
            </th>
        </tr>
    );
};

export default FilterFlights;