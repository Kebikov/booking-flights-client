import 'bootstrap/dist/css/bootstrap.css';
import '../Booking/booking.scss';
import '../../types.js'; 
import LineForTableFlights from '../../components/LineForTableFlights/LineForTableFlights.jsx';
import HeaderForTableFlights from '../../components/HeaderForTableFlights/HeaderForTableFlights';
import useGetAllFlights from '../../hooks/useGetAllFlights';
import FilterFlights from '../../components/FilterFlights/FilterFlights.jsx';
import TableControl from '../../components/TableControl/TableControl.jsx';
import useTable from '../../hooks/useTable.js';


/**
 * Page > С данными рейсов :
 * - Редактирование рейсов.
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
    const {updateAllFlights, curentDataFlights} = useGetAllFlights('flights');

    const {choiceLine, deleteLine, selectedLine} = useTable('/delete-flights', updateAllFlights);
    
    const infoFlights = curentDataFlights.map((order, i) => {
        return <LineForTableFlights order={order} choiceLine={choiceLine} selectedLine={selectedLine} key={i} />;
    });


    return(
        <>
            <div className="table-booking mt-2">
                <table className="table _width-table">
                    <thead>
                        <HeaderForTableFlights/>
                    </thead>
                    <thead>
                        <FilterFlights/>
                    </thead>
                    <tbody>
                        {infoFlights}
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

