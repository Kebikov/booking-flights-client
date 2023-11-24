import 'bootstrap/dist/css/bootstrap.css';
import './booking.scss';
import '../../scss/public.scss';
import { useEffect, useState } from 'react';
import { httpSQL } from '../../service/http.service';
import * as Types from '../../types.js'; // eslint-disable-line
import useGetAllBooking from '../../hooks/useGetAllBooking.js';
import useGetAllFlights from '../../hooks/useGetAllFlights.js';
import LineForTableBooking from '../../components/LineForTableBooking/LineForTableBooking.jsx';
import TableControl from '../../components/TableControl/TableControl.jsx';
import useTable from '../../hooks/useTable.js';
import { setCurrentPage } from '../../redux/slice/sliceForm.js';
import { useDispatch } from 'react-redux';


/** 
 * Page > забронированные рейсы :
 * - Данными забронированных рейсов клиентами.
 * @component
 */
const Booking = () => {

    const dispatch = useDispatch();

    /**
     * Hook useGetAllBooking return.
     * @type {Types.UseGetAllBooking}
     */
    const {updateAllBooking, curentDataBooking} = useGetAllBooking();

    /**
     * Hook useGetAllFlights return.
     * @type {Types.UseGetAllFlights}
     */
    const {updateAllFlights} = useGetAllFlights();

    // /**
    //  * selectedLine - Id выбранного обьекта для редактирования или удаления.
    //  * @type {[number, function(number): void]}
    //  */
    // const [selectedLine, setSelectedLine] = useState(null);

    //* Function удаление брони
    // const deleteElement = () => {
    //     if(selectedLine === null) {
    //         alert('Выберите бронь для удаления. Нажмите на номер рейса.');
    //         return;
    //     }

    //     httpSQL
    //         .delete('/delete-booking', {data: {id: selectedLine} })
    //         .then(res => {
    //             const msg = res.data?.msg;
    //             if(msg === 'ENTRY_DELETED') {
    //                 alert('Запись удалена.');
    //                 setSelectedLine(null);
    //                 updateAllBooking();
    //                 updateAllFlights();
    //             } else {
    //                 setSelectedLine(null);
    //                 alert(`${msg}`);
    //             }
    //         })
    //         .catch(error => console.error(error));
    // };

    //* редактировани брони
    // const editElement = (event) => {
    //     const idElement = Number(event.target.id);
    //     if(selectedLine === null || selectedLine !== idElement) {
    //         setSelectedLine(idElement);
    //     } else {
    //         setSelectedLine(null);
    //     }
    // };

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
                pathAdd={'/add-booking'}
                pathEdit={'/edit-booking'}
            />
        </div>
    );
};

export default Booking;