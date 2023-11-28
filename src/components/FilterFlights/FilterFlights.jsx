import '../../page/Booking/booking.scss';
import './filterFlights.scss';
import '../../types';
import { setFilterFlights } from '../../redux/slice/sliceForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


/**
 * COMPONENT > Блок в верху таблицы для установки фильтрации данных.
 * @component
 * @example
 * <FilterFlights/>
 */
//= FilterFlights 
const FilterFlights = () => {

    const dispatch = useDispatch();
    const filterFlights = useSelector(state => state.sliceForm.filterFlights);

    const filter = (event) => {
        const target = event.target;
        const id = target.id;
        const value = target.value;

        dispatch( setFilterFlights({[id]: value}) );
    };
    // Сброс значений по умолчанию.
    const reset = () => {
        dispatch( setFilterFlights('RESET') );
    };

    useEffect(() => {
        // Сброс значений по умолчанию при размонтировании компонента.
        return () => {
            dispatch( setFilterFlights('RESET') );
        };
    },[]); // eslint-disable-line

    return(
        <tr>
            <th scope="col">
                <input 
                    id="route" 
                    value={filterFlights?.route ?? ''}
                    onChange={filter} 
                    className="table-input" 
                    type="text" 
                    autoComplete="off"
                />
            </th>
            <th scope="col">
                <input 
                    id="city" 
                    value={filterFlights?.city ?? ''}
                    onChange={filter} 
                    className="table-input" 
                    type="text" 
                    autoComplete="off"
                />
            </th>
            <th scope="col">
                <input 
                    id="date" 
                    value={filterFlights?.date ?? ''}
                    onChange={filter} 
                    className="table-input" 
                    type="date" 
                    autoComplete="off"
                />
            </th>
            <th scope="col">
                <input 
                    id="company" 
                    value={filterFlights?.company ?? ''}
                    onChange={filter} 
                    className="table-input" 
                    type="text" 
                    autoComplete="off"
                />
            </th>
            <th scope="col">
                <input 
                    id="checkIn" 
                    value={filterFlights?.checkIn ?? ''}
                    onChange={filter} 
                    className="table-input" 
                    type="date" 
                    autoComplete="off"
                />
            </th>
            <th scope="col">
                <input 
                    id="freePlace" 
                    value={filterFlights?.freePlace ?? ''}
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