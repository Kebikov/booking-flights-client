
/**
* Функция проверяет строку на соответствие формату iso8601('2023-12-10T21:00:00.000Z')
* @param {string} str строка в формате iso8601
* @return {boolean} вернет true/false в зависимости от результата проверки
*/
const isISO8601Date = (str) => {
    // Регулярное выражение для проверки формата ISO 8601
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z?$/;
    // Проверяем соответствие формату
    return iso8601Regex.test(str);
}

/**
* Функция проверяет и конвертирует строку
* - проверяет на соответствие формату iso8601('2023-12-10T21:00:00.000Z')
* - конвертирует с iso8601('2023-12-10T21:00:00.000Z')
* - конвертирует в '10.12.2023 21:00'
* @param {string} strDate строка в формате iso8601
* @return {string} вернет строку в формате '10.12.2023 21:00'
*/
const convertFormatData = (strDate) => {
    try {

        if(isISO8601Date(strDate)) {
            const dateSplit = strDate.split('T');
            const day = dateSplit[0];
            const time = dateSplit[1];

            const daySplit = day.split('-');
            const timeSlice = time.slice(0, 5);
            const resalt= `${daySplit[2]}.${daySplit[1]}.${daySplit[0]} ${timeSlice}`;

            return resalt; 
        } else {
            throw new Error('Строка не соответствует формату ISO 8601');
        }

    }catch (error) {
        console.error(error);
    }
};

convertFormatData('2023-12-10T21:00:00.000Z');

export default convertFormatData;

