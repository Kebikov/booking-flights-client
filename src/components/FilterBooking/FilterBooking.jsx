import '../../page/Booking/booking.scss';
import '../FilterFlights/filterFlights.scss';
import '../../types';
import { setFilterBooking } from '../../redux/slice/sliceForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


/**
 * COMPONENT > Блок в верху таблицы для установки фильтрации данных.
 * @component
 * @example
 * <FilterBooking/>
 */
//= FilterBooking 
const FilterBooking = () => {

    const dispatch = useDispatch();
    /**
     * @type {FilterData}
     */
    const filterBooking = useSelector(state => state.sliceForm.filterBooking);
    // Добавление фильтра.
    const filter = (event) => {
        const target = event.target;
        const id = target.id;
        const value = target.value;

        dispatch( setFilterBooking({[id]: value}) );
    };
    // Сброс значений по умолчанию.
    const reset = () => {
        dispatch( setFilterBooking('RESET') );
    };

    useEffect(() => {
        // Сброс значений по умолчанию при размонтировании компонента.
        return () => {
            dispatch( setFilterBooking('RESET') );
        };
    },[]); // eslint-disable-line

    return(
        <tr>
            <th scope="col">
                <input 
                    id="route" 
                    value={filterBooking?.route ?? ''}
                    onChange={filter} 
                    className="table-input" 
                    type="text" 
                    autoComplete="off"
                />
            </th>
            <th scope="col">
                <input 
                    id="surname" 
                    value={filterBooking?.surname ?? ''}
                    onChange={filter} 
                    className="table-input" 
                    type="text" 
                    autoComplete="off"
                />
            </th>
            <th scope="col">
                <input 
                    id="name" 
                    value={filterBooking?.name ?? ''}
                    onChange={filter} 
                    className="table-input" 
                    type="text" 
                    autoComplete="off"
                />
            </th>
            <th scope="col">
                <input 
                    id="middleName" 
                    value={filterBooking?.middleName ?? ''}
                    onChange={filter} 
                    className="table-input" 
                    type="text" 
                    autoComplete="off"
                />
            </th>
            <th scope="col">
                <input 
                    id="date" 
                    value={filterBooking?.date ?? ''}
                    onChange={filter} 
                    className="table-input" 
                    type="date" 
                    autoComplete="off"
                />
            </th>
            <th scope="col">
                <input 
                    id="sit" 
                    value={filterBooking?.sit ?? ''}
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

export default FilterBooking;