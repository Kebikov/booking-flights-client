import 'bootstrap/dist/css/bootstrap.css';
import '../Booking/booking.scss';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { httpSQL } from '../../service/http.service';
import LineForTableFlights from '../../components/LineForTableFlights/LineForTableFlights.jsx';
import HeaderForTableBooking from '../../components/HeaderForTableBooking/HeaderForTableBooking';
import useGetAllFlights from '../../hooks/useGetAllFlights';
import * as Types from '../../types.js'; // eslint-disable-line
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
     * @type {Types.UseGetAllFlights}
     */
    const {updateAllFlights, curentDataFlights} = useGetAllFlights();

    const {choiceLine, deleteLine, selectedLine} = useTable('/edit-booking', updateAllFlights);

    const infoBooking = curentDataFlights.map((order, i) => 
        <LineForTableFlights order={order} choiceLine={choiceLine} selectedLine={selectedLine} key={i} />
    );


    return(
        <>
            <div className="table-booking">
                <table className="table">
                    <thead>
                        <HeaderForTableBooking/>
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
                    pathAdd={'/add-flights'}
                    pathEdit={'/edit-flights'}
                />
            </div>
        </>
    );
};

export default Flights;

