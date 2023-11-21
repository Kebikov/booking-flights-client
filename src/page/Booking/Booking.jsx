import 'bootstrap/dist/css/bootstrap.css';
import './booking.scss';
import { useState } from 'react';
import { httpSQL } from '../../service/http.service';
import { useNavigate } from 'react-router-dom';
import * as Types from '../../types.js'; // eslint-disable-line
import useGetAllBooking from '../../hooks/useGetAllBooking.js';
import useGetAllFlights from '../../hooks/useGetAllFlights.js';
import LineForTableBooking from '../../components/LineForTableBooking/LineForTableBooking.jsx';


/** 
 * Page > забронированные рейсы :
 * - Данными забронированных рейсов клиентами.
 * @component
 */
const Booking = () => {

    const navigate = useNavigate();

    const {updateAllBooking, curentDataBooking} = useGetAllBooking();
    const {updateAllFlights} = useGetAllFlights();

    /** dataBooking - массив обьектов с данными бронирования
     * @type {[Types.BookingData[], function(Types.BookingData[]): void]}
     */

    /**
     * choiceFlights - Id выбранного обьекта для редактирования или удаления.
     * @type {[number, function(number): void]}
     */
    const [choiceBooking, setChoiceBooking] = useState(null);
    console.log(choiceBooking);
    //* редактировани брони
    const deleteElement = () => {
        if(choiceBooking === null) {
            alert('Выберите бронь для удаления. Нажмите на номер рейса.');
            return;
        }

        httpSQL
            .delete('/delete-booking', {data: {id: choiceBooking} })
            .then(res => {
                const msg = res.data?.msg;
                if(msg === 'BOOKING_DELETED') {
                    alert('Бронь удалена.');
                    setChoiceBooking(null);
                    updateAllBooking();
                    updateAllFlights();
                } else {
                    setChoiceBooking(null);
                    alert(`${msg}`);
                }
            })
            .catch(error => console.error(error));
    };

    //* редактировани брони
    const editElement = (event) => {
        const idElement = Number(event.target.id);
        if(choiceBooking === null || choiceBooking !== idElement) {
            setChoiceBooking(idElement);
        } else {
            setChoiceBooking(null);
        }
    };

    /** 
     * Строки с информацией о бронировании. 
     * @type {Element[]} infoBooking 
     */
    const infoBooking = curentDataBooking.map((order, i) => 
        <LineForTableBooking order={order} edit={editElement} choice={choiceBooking} key={i} />
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
            <div className="table-control">
                <div className="table-control__body">
                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                        <button 
                            type="button" 
                            className="btn btn-outline-primary"
                            onClick={() => navigate('/add-booking')}
                        >
                            add
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-outline-primary"
                            onClick={
                                choiceBooking ?
                                    () => navigate(`/edit-booking/${choiceBooking}`)
                                    :
                                    null
                            }
                        >
                            edit
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-outline-primary" 
                            onClick={deleteElement}
                        >
                            del
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;