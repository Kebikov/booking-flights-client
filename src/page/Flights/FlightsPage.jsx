import 'bootstrap/dist/css/bootstrap.css';
import '../Booking/bookingPage.scss';
import { useState, useEffect } from 'react';
import convertFormatData from '../../helpers/convertFormatData';
import { httpSQL } from '../../service/http.service';
import PopUpFormFlights from '../../components/PopUpFormFlights/PopUpFormFlights';


/**
 * Page > данными рейсов :
 * - редактирование рейсов
 * @component
 */
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

    const infoBooking = dataFlights.map((order, i) => {
        return(
            <tr key={i} >
                
                <td>{order?.route ? order.route : '-'}</td>
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
    },[]);

    return(
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
            <PopUpFormFlights/>
        </div>
    );
};

export default FlightsPage;