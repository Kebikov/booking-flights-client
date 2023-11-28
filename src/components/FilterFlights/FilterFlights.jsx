import '../../page/Booking/booking.scss';
import './filterFlights.scss';
import '../../types';
import { setFilterData } from '../../redux/slice/sliceForm';
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
    const filterData = useSelector(state => state.sliceForm.filterData);

    const filter = (event) => {
        const target = event.target;
        const id = target.id;
        const value = target.value;

        dispatch( setFilterData({[id]: value}) );
    };
    // Сброс значений по умолчанию.
    const reset = () => {
        dispatch( setFilterData('RESET') );
    };

    useEffect(() => {
        // Сброс значений по умолчанию при размонтировании компонента.
        return () => {
            dispatch( setFilterData('RESET') );
        };
    },[]); // eslint-disable-line

    return(
        <tr>
            <th scope="col">
                <input 
                    id="route" 
                    value={filterData?.route ?? ''}
                    onChange={filter} 
                    className="table-input" 
                    type="text" 
                    autoComplete="off"
                />
            </th>
            <th scope="col">
                <input 
                    id="city" 
                    value={filterData?.city ?? ''}
                    onChange={filter} 
                    className="table-input" 
                    type="text" 
                    autoComplete="off"
                />
            </th>
            <th scope="col">
                <input 
                    id="date" 
                    value={filterData?.date ?? ''}
                    onChange={filter} 
                    className="table-input" 
                    type="date" 
                    autoComplete="off"
                />
            </th>
            <th scope="col">
                <input 
                    id="company" 
                    value={filterData?.company ?? ''}
                    onChange={filter} 
                    className="table-input" 
                    type="text" 
                    autoComplete="off"
                />
            </th>
            <th scope="col">
                <input 
                    id="checkIn" 
                    value={filterData?.checkIn ?? ''}
                    onChange={filter} 
                    className="table-input" 
                    type="date" 
                    autoComplete="off"
                />
            </th>
            <th scope="col">
                <input 
                    id="freePlace" 
                    value={filterData?.freePlace ?? ''}
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