import 'bootstrap/dist/css/bootstrap.css';
import './bookingPage.scss';
import fakeData from '../../data/fakeData';


/**
 * Page > забронированные рейсы :
 * - данными забронированных рейсов клиентами
 * @component
 */
const BookingPage = () => {

    const infoBooking = fakeData.map((order, i) => {
        return(
            <tr key={i} >
                
                <td>{order?.route ? order.route : '-'}</td>
                <td>{order?.surname ? order.surname : '-'}</td>
                <td>{order?.name ? order.name : '-'}</td>
                <td>{order?.middleName ? order.middleName : '-'}</td>
                <td>{order?.date ? order.date :  '-'}</td>
                <td>{order?.sit ? order.sit : '-'}</td>
                <td>{order?.note ? order.note : '-'}</td>
            </tr>
        );
    });

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