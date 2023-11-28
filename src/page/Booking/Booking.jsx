import 'bootstrap/dist/css/bootstrap.css';
import './booking.scss';
import '../../scss/public.scss';
import '../../types';
import useGetAllBooking from '../../hooks/useGetAllBooking.js';
import useGetAllFlights from '../../hooks/useGetAllFlights.js';
import LineForTableBooking from '../../components/LineForTableBooking/LineForTableBooking.jsx';
import TableControl from '../../components/TableControl/TableControl.jsx';
import useTable from '../../hooks/useTable.js';
import HeaderForTableBooking from '../../components/HeaderForTableBooking/HeaderForTableBooking.jsx';
import FilterBooking from '../../components/FilterBooking/FilterBooking.jsx';


/** 
 * Page > забронированные рейсы :
 * - Данными забронированных рейсов клиентами.
 * @component
 */
const Booking = () => {

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
        <>
            <div className="table-booking mt-2">
                <table className="table _width-table">
                    <thead>
                        <HeaderForTableBooking/>
                    </thead>
                    <thead>
                        <FilterBooking/>
                    </thead>
                    <tbody>
                        {infoBooking}
                    </tbody>
                </table>
            </div>
            <TableControl 
                choice={selectedLine} 
                deleteElement={deleteLine} 
                table={'booking'}
            />
        </>
    );
};

export default Booking;