/**
* COMPONENT > имена столбцов в таблице
* - РЕЙС / ГОРОД(АЭРОПОРТ) / ДАТА И ВРЕМЯ / ... 
* @component
* @example
* Пример использования компонента <HeaderForTableBooking/>:
* <HeaderForTableBooking/>
*/
//= HeaderForTableBooking 
const HeaderForTableBooking = () => {
    return(
        <tr>
            <th scope="col">РЕЙС</th>
            <th scope="col">ГОРОД(АЭРОПОРТ)</th>
            <th scope="col">ДАТА И ВРЕМЯ</th>
            <th scope="col">АВИАКОМПАНИЯ</th>
            <th scope="col">РЕГИСТРАЦИЯ ДО</th>
            <th scope="col">КОЛ-ВО МЕСТ*</th>
            <th scope="col">ПРИМЕЧАНИЯ</th>
        </tr>
    );
};

export default HeaderForTableBooking;