import convertFormatData from '../../helpers/convertFormatData';

/**
 * COMPONENT > строки для таблицы полетов.
 * @component
 * @example
 * <LineForTableBooking order={...} edit={...} choice={...} />
 * @param {Object} order - обьек с данными.
 * @param {Function} edit - функция для выбора строки.
 * @param {number} choice - состояние с выбранной строкой.
 */
//= LineForTableBooking 
const LineForTableBooking = ({order, edit, choice}) => {

    return(
        <tr key={order?.id} >
            <td
                id={order?.id} 
                onClick={edit} 
                className={order?.id === choice ? 'bg-secondary text-white' : ''}
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


