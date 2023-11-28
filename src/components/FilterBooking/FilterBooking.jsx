import '../../page/Booking/booking.scss';
import '../FilterFlights/filterFlights.scss';
import '../../types';
import { setFilterData } from '../../redux/slice/sliceForm';
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
    const filterData = useSelector(state => state.sliceForm.filterData);
    // Добавление фильтра.
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
                    id="surname" 
                    value={filterData?.surname ?? ''}
                    onChange={filter} 
                    className="table-input" 
                    type="text" 
                    autoComplete="off"
                />
            </th>
            <th scope="col">
                <input 
                    id="name" 
                    value={filterData?.name ?? ''}
                    onChange={filter} 
                    className="table-input" 
                    type="text" 
                    autoComplete="off"
                />
            </th>
            <th scope="col">
                <input 
                    id="middleName" 
                    value={filterData?.middleName ?? ''}
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
                    id="sit" 
                    value={filterData?.sit ?? ''}
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