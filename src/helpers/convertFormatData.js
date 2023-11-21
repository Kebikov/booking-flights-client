
/** 
 * Функция проверяет и конвертирует строку
 * - проверяет на соответствие формату iso8601('2023-12-10T21:00:00.000Z')
 * - конвертирует с iso8601('2023-12-10T21:00:00.000Z')
 * - конвертирует в '10.12.2023 21:00'
 * @param {string} strDate строка в формате iso8601
 * @return {string} вернет строку в формате '10.12.2023 21:00' или '10.12.2023T21:00'
 */
const convertFormatData = (strDate) => {
    try {
        let dateSplit;
        if(strDate.includes('T', 0)) {
            dateSplit = strDate.split('T');
        } else {
            dateSplit = strDate.split(' ');
        }
        
        const day = dateSplit[0];
        const time = dateSplit[1];

        const daySplit = day.split('-');
        const timeSlice = time.slice(0, 5);
        const resalt= `${daySplit[2]}.${daySplit[1]}.${daySplit[0]} ${timeSlice}`;

        return resalt; 
    }catch (error) {
        console.error(error);
    }
};

convertFormatData('2023-12-10T21:00:00.000Z');

export default convertFormatData;

