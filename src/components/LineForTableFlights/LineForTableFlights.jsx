import convertFormatData from '../../helpers/convertFormatData';

/**
 * COMPONENT > строки для таблицы полетов.
 * @component
 * @example
 * <LineForTableFlights order={...} choiceLine={...} selectedLine={...} />
 * @param {Object} order - Обьек с данными.
 * @param {Function} choiceLine - Функция для выбора строки.
 * @param {number}  selectedLine - Состояние с выбранной строкой.
 */
//= LineForTableBooking 
const LineForTableFlights = ({order, choiceLine,  selectedLine}) => {

    return(
        <tr key={order?.id} >
            <td 
                id={order?.id} 
                onClick={choiceLine} 
                className={order?.id ===  selectedLine ? 'bg-secondary text-white' : ''}
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


