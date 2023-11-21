import 'bootstrap/dist/css/bootstrap.css';
import '../Booking/booking.scss';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { httpSQL } from '../../service/http.service';
import LineForTableFlights from '../../components/LineForTableFlights/LineForTableBooking';
import HeaderForTableBooking from '../../components/HeaderForTableBooking/HeaderForTableBooking';
import useGetAllFlights from '../../hooks/useGetAllFlights';


/**
 * Page > c данными рейсов :
 * - редактирование рейсов
 * @component
 * @example
 * <Flights/>
 */
//-- Flights 
const Flights = () => {

    const navigate = useNavigate();
    const {updateAllFlights, curentDataFlights} = useGetAllFlights();

    /**
     * choiceFlights - Id выбранного обьекта для редактирования или удаления.
     * @type {[number, function(number): void]}
     */
    const [choiceFlights, setChoiceFlights] = useState(null);

    const editElement = (event) => {
        const idElement = Number(event.target.id);
        if(choiceFlights === null || choiceFlights !== idElement) {
            setChoiceFlights(idElement);
        } else {
            setChoiceFlights(null);
        }
    };

    const deleteElement = () => {
        if(choiceFlights === null) {
            alert('Выберите рейс для удаления. Нажмите на номер рейса.');
            return;
        }

        httpSQL
            .delete('/delete-flights', {data: {id: choiceFlights} })
            .then(res => {
                const msg = res.data?.msg;
                if(msg === 'Рейс удален.') {
                    setChoiceFlights(null);
                    updateAllFlights();
                } else {
                    setChoiceFlights(null);
                    alert(`${msg}`);
                }
            })
            .catch(error => console.error(error));
    };

    const infoBooking = curentDataFlights.map((order, i) => 
        <LineForTableFlights order={order} edit={editElement} choice={choiceFlights} key={i} />
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
                <div className="table-control">
                    <div className="table-control__body">
                        <div className="btn-group" role="group" aria-label="Basic outlined example">
                            <button 
                                type="button" 
                                className="btn btn-outline-primary"
                                onClick={() => navigate('/add-flights')}
                            >
                                add
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-outline-primary"
                                onClick={
                                    choiceFlights ?
                                        () => navigate(`/edit-flights/${choiceFlights}`)
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
        </>
    );
};

export default Flights;

