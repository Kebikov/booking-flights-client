import 'bootstrap/dist/css/bootstrap.css';
import './booking.scss';
import '../../scss/public.scss';
import '../../types';
import useGetAllBooking from '../../hooks/useGetAllBooking.js';
import useGetAllFlights from '../../hooks/useGetAllFlights.js';
import LineForTableBooking from '../../components/LineForTableBooking/LineForTableBooking.jsx';
import TableControl from '../../components/TableControl/TableControl.jsx';
import useTable from '../../hooks/useTable.js';
import { useState } from 'react';



/** 
 * Page > забронированные рейсы :
 * - Данными забронированных рейсов клиентами.
 * @component
 */
const Booking = () => {
    
    /**
     * State c данными, для фильтрации брони.
     * @type {[FilterBookingData, function(FilterBookingData): void]}
     */
    const [filterState, setFilterState] = useState({
        moreLessId: '', moreLessState: '', route: '', surname: '',
        name: '', middleName: '', date: '', sit: ''
    });

    /**
     * Hook useGetAllBooking return.
     * @type {UseGetAllBooking}
     */
    const {updateAllBooking, curentDataBooking} = useGetAllBooking();

    /**
     * Hook useGetAllFlights return.
     * @type {UseGetAllFlights}
     */
    const {updateAllFlights} = useGetAllFlights();

    const {choiceLine, deleteLine, selectedLine} = useTable('/delete-booking', updateAllBooking, updateAllFlights);

    /** 
     * Строки с информацией о бронировании. 
     * @type {Element[]} infoBooking 
     */
    const infoBooking = curentDataBooking.map((order, i) => 
        <LineForTableBooking order={order} choiceLine={choiceLine} selectedLine={selectedLine} key={i} />
    );

    return(
        <div className="table-booking">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">РЕЙС</th>
                        <th scope="col">ФАМИЛИЯ</th>
                        <th scope="col">ИМЯ</th>
                        <th scope="col">ОТЧЕСТВО</th>
                        <th scope="col">ДАТА БРОНИ</th>
                        <th scope="col">№ МЕСТА</th>
                        <th scope="col">ПРИМЕЧАНИЯ</th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th scope="col">
                            <input className="table-input" type="text" />
                        </th>
                        <th scope="col">
                            <input className="table-input" type="text" />
                        </th>
                        <th scope="col">
                            <input className="table-input" type="text" />
                        </th>
                        <th scope="col">
                            <input className="table-input" type="text" />
                        </th>
                        <th scope="col">
                            <input className="table-input" type="text" />
                        </th>
                        <th scope="col">
                            <input className="table-input" type="text" />
                        </th>
                        <th scope="col">
                            <input className="table-input" type="text" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {infoBooking}
                </tbody>
            </table>
            <TableControl 
                choice={selectedLine} 
                deleteElement={deleteLine} 
                table={'booking'}
                filterState={filterState}
                setFilterState={setFilterState}
            />
        </div>
    );
};

export default Booking;