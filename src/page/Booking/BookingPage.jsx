import 'bootstrap/dist/css/bootstrap.css';
import './bookingPage.scss';
import { useState, useEffect } from 'react';
import convertFormatData from '../../helpers/convertFormatData';
import { httpSQL } from '../../service/http.service';


/**
* Page > забронированные рейсы :
* - данными забронированных рейсов клиентами
* @component
*/
const BookingPage = () => {

    /**
    * @typedef {Object} BookingData
    * @property {string} route - id рейса
    * @property {string} surname - фамилия пасажира
    * @property {string} name - имя пасажира
    * @property {string} middleName - отчество пасажира
    * @property {string} date - фамилия пасажира
    * @property {number} sit - номер места пасажира
    * @property {string} note - примечание
    */

    /**
    * dataBooking - массив обьектов с данными бронирования
    * @type {[BookingData[], React.Dispatch<React.SetStateAction<BookingData[]>>]}
    */
    const [dataBooking, setDataBooking] = useState([]);

    const infoBooking = dataBooking.map((order, i) => {
        return(
            <tr key={i} >
                
                <td>{order?.route ? order.route : '-'}</td>
                <td>{order?.surname ? order.surname : '-'}</td>
                <td>{order?.name ? order.name : '-'}</td>
                <td>{order?.middleName ? order.middleName : '-'}</td>
                <td>{order?.date ? convertFormatData(order.date) :  '-'}</td>
                <td>{order?.sit ? order.sit : '-'}</td>
                <td>{order?.note ? order.note : '-'}</td>
            </tr>
        );
    });

    useEffect(() => {
        httpSQL
            .get('/booking-data')
            .then(res => setDataBooking(res.data))
            .catch(error => console.error(error));
    },[]);

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
        </div>
    );
};

export default BookingPage;