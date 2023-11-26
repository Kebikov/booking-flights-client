import 'bootstrap/dist/css/bootstrap.css';
import '../Booking/booking.scss';
import '../../types.js'; 
import LineForTableFlights from '../../components/LineForTableFlights/LineForTableFlights.jsx';
import HeaderForTableBooking from '../../components/HeaderForTableBooking/HeaderForTableBooking';
import useGetAllFlights from '../../hooks/useGetAllFlights';
import FilterFlights from '../../components/FilterFlights/FilterFlights.jsx';
import TableControl from '../../components/TableControl/TableControl.jsx';
import useTable from '../../hooks/useTable.js';


/**
 * Page > c данными рейсов :
 * - редактирование рейсов
 * @component
 * @example
 * <Flights/>
 */
//-- Flights 
const Flights = () => {


    /**
     * Hook useGetAllFlights return.
     * @type {UseGetAllFlights}
     */
    const {updateAllFlights, curentDataFlights} = useGetAllFlights();

    const {choiceLine, deleteLine, selectedLine} = useTable('/edit-booking', updateAllFlights);

    const infoBooking = curentDataFlights.map((order, i) => 
        <LineForTableFlights order={order} choiceLine={choiceLine} selectedLine={selectedLine} key={i} />
    );


    return(
        <>
            <div className="table-booking">
                <table className="table _width-table">
                    <thead>
                        <HeaderForTableBooking/>
                    </thead>
                    <thead>
                        <FilterFlights />
                    </thead>
                    <tbody>
                        {infoBooking}
                    </tbody>
                </table>
            </div>
            <TableControl 
                choice={selectedLine} 
                deleteElement={deleteLine} 
                table={'flights'}
            />
        </>
    );
};

export default Flights;

