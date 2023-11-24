import convertFormatData from '../../helpers/convertFormatData';

/**
 * COMPONENT > строки для таблицы полетов.
 * @component
 * @example
 * <LineForTableBooking order={...} choiceLine={...} selectedLine={...} />
 * @param {Object} order - Обьек с данными.
 * @param {Function} choiceLine - Функция для выбора строки.
 * @param {number} selectedLine - Состояние с выбранной строкой.
 */
//= LineForTableBooking 
const LineForTableBooking = ({order, choiceLine, selectedLine}) => {

    return(
        <tr key={order?.id} >
            <td
                id={order?.id} 
                onClick={choiceLine} 
                className={order?.id === selectedLine ? 'bg-secondary text-white' : ''}
            >{order?.route ? order.route : '-'}</td>
            <td>{order?.surname ? order.surname : '-'}</td>
            <td>{order?.name ? order.name : '-'}</td>
            <td>{order?.middleName ? order.middleName : '-'}</td>
            <td>{order?.date ? convertFormatData(order.date) :  '-'}</td>
            <td>{order?.sit ? order.sit : '-'}</td>
            <td>{order?.note ? order.note : '-'}</td>
        </tr>
    );
};

export default LineForTableBooking;


