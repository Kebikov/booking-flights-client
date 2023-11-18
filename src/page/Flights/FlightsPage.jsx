import 'bootstrap/dist/css/bootstrap.css';
import '../Booking/bookingPage.scss';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import convertFormatData from '../../helpers/convertFormatData';
import { httpSQL } from '../../service/http.service';


/**
 * Page > данными рейсов :
 * - редактирование рейсов
 * @component
 */
//-- FlightsPage 
const FlightsPage = () => {

    /**
    * @typedef {Object} FlightsData
    * @property {string} route - id рейса
    * @property {string} city - город назначения
    * @property {string} date - дата и время вылета
    * @property {string} company - комания перевозчик
    * @property {string} checkIn - крайний срок регистрации на рейс
    * @property {number} freePlace - количество свободных мест в самолете
    * @property {string} note - примечание
    */

    /**
    * dataBooking - массив обьектов с данными бронирования
    * @type {[FlightsData[], React.Dispatch<React.SetStateAction<FlightsData[]>>]}
    */
    const [dataFlights, setDataFlights] = useState([]);
    /**
    * choiceFlights -  id выбранного обьекта для редактирования или удаления
    * @type {[number, React.Dispatch<React.SetStateAction<number>>]}
    */
    const [choiceFlights, setChoiceFlights] = useState(null);
    /**
    * componentUpdate - переключатель для запроса обновленных данных с сервера
    * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
    */
    const [componentUpdate, setComponentUpdate] = useState(true);

    const navigate = useNavigate();

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
                    setComponentUpdate(state => !state);
                } else {
                    setChoiceFlights(null);
                    alert(`${msg}`);
                }
            })
            .catch(error => console.error(error));
    };


    // className='bg-secondary text-white'

    const infoBooking = dataFlights.map((order, i) => {
        return(
            <tr key={i} >
                <td 
                    id={order?.id} 
                    onClick={editElement} 
                    className={order?.id === choiceFlights ? 'bg-secondary text-white' : ''}
                >
                    {order?.route ? order.route : '-'}
                </td>
                <td>{order?.city  ? order.city : '-'}</td>
                <td>{order?.date ? convertFormatData(order.date) : '-'}</td>
                <td>{order?.company ? order.company : '-'}</td>
                <td>{order?.checkIn ? convertFormatData(order.checkIn) :  '-'}</td>
                <td>{order?.freePlace ? order.freePlace : '-'}</td>
                <td>{order?.note ? order.note : '-'}</td>
            </tr>
        );
    });

    useEffect(() => {
        httpSQL
            .get('/flights-data')
            .then(res => setDataFlights(res.data))
            .catch(error => console.error(error));
    },[componentUpdate]);

    return(
        <>
            <div className="table-booking">
                <table className="table">
                    <thead>
                        <tr>
                            
                            <th scope="col">РЕЙС</th>
                            <th scope="col">ГОРОД(АЭРОПОРТ)</th>
                            <th scope="col">ДАТА И ВРЕМЯ</th>
                            <th scope="col">АВИАКОМПАНИЯ</th>
                            <th scope="col">РЕГИСТРАЦИЯ ДО</th>
                            <th scope="col">КОЛ-ВО МЕСТ*</th>
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
                                onClick={() => navigate('/add-Flights')}
                            >
                                add
                            </button>
                            <button type="button" className="btn btn-outline-primary">edit</button>
                            <button type="button" className="btn btn-outline-primary" onClick={deleteElement}>del</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default FlightsPage;

