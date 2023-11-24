import 'bootstrap/dist/css/bootstrap.css';
import '../Booking/booking.scss';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { httpSQL } from '../../service/http.service';
import LineForTableFlights from '../../components/LineForTableFlights/LineForTableBooking';
import HeaderForTableBooking from '../../components/HeaderForTableBooking/HeaderForTableBooking';
import useGetAllFlights from '../../hooks/useGetAllFlights';
import * as Types from '../../types.js'; // eslint-disable-line
import TableControl from '../../components/TableControl/TableControl.jsx';


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

    // /**
    //  * selectedLine - Id выбранного обьекта для редактирования или удаления.
    //  * @type {[number, function(number): void]}
    //  */
    // const [selectedLine, setSelectedLine] = useState(null);

    // const editElement = (event) => {
    //     const idElement = Number(event.target.id);
    //     if(selectedLine === null || selectedLine !== idElement) {
    //         setSelectedLine(idElement);
    //     } else {
    //         setSelectedLine(null);
    //     }
    // };

    // const deleteElement = () => {
    //     if(selectedLine === null) {
    //         alert('Выберите рейс для удаления. Нажмите на номер рейса.');
    //         return;
    //     }

    //     httpSQL
    //         .delete('/delete-flights', {data: {id: selectedLine} })
    //         .then(res => {
    //             const msg = res.data?.msg;
    //             if(msg === 'Запись удалена.') {
    //                 setSelectedLine(null);
    //                 updateAllFlights();
    //             } else {
    //                 setSelectedLine(null);
    //                 alert(`${msg}`);
    //             }
    //         })
    //         .catch(error => console.error(error));
    // };

    const infoBooking = curentDataFlights.map((order, i) => 
        <LineForTableFlights order={order} edit={editElement} choice={selectedLine} key={i} />
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
                    choiceBooking={selectedLine} 
                    deleteElement={deleteElement} 
                    pathAdd={'/add-flights'}
                    pathEdit={'/edit-flights'}
                />
            </div>
        </>
    );
};

export default Flights;

