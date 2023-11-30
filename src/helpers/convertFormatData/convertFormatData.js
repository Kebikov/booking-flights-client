
/** 
 * Функция конвертирует строку:
 * - с iso8601 ('2023-12-10T21:00:00.000Z') или без Т ('2023-12-10 21:00:00.000Z').
 * - в '10.12.2023 21:00'.
 * @param {string} strDate строка в формате iso8601 или в таком же формате без Т посередине.
 * @return {string} вернет строку в удобочитаемом формате ('10.12.2023 21:00').
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

        if (!day || !time) return null;

        const daySplit = day.split('-');
        const timeSlice = time.slice(0, 5);  
        const resalt= `${daySplit[2]}.${daySplit[1]}.${daySplit[0]} ${timeSlice}`;

        if (!daySplit[2] || !daySplit[1] || !daySplit[0] || !timeSlice) return null;

        return resalt; 
    }catch (error) {
        console.error(error);
        throw error;
    }
};

//console.log(convertFormatData('abc'));



export default convertFormatData;


