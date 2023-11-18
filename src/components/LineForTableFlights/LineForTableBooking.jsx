import convertFormatData from '../../helpers/convertFormatData';

/**
* COMPONENT > строки для таблицы полетов.
* @component
* @example
* <LineForTableFlights order={...} edit={...} choice={...} />
* @param {Object} order - обьек с данными.
* @param {Function} edit - функция для выбора строки.
* @param {number} choice - состояние с выбранной строкой.
*/
//= LineForTableBooking 
const LineForTableFlights = ({order, edit, choice}) => {

    return(
        <tr key={order?.id} >
            <td 
                id={order?.id} 
                onClick={edit} 
                className={order?.id === choice ? 'bg-secondary text-white' : ''}
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
};

export default LineForTableFlights;


