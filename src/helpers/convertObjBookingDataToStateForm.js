import '../types.js'; 

/** Функция конвертации обьекта с type BookingData в обьект с type FormBooking
 * @param {BookingData} bookingData 
 * @returns {FormBooking}
 */
const convertObjBookingDataToStateForm = (bookingData) => {

    const state = {
        id: '', 
        value: '', 
        target: '', 

        route: bookingData.route, 
        surname: bookingData.surname, 
        name: bookingData.name,
        middleName: bookingData.middleName, 
        note: bookingData.note
    };

    return state;
};

export default convertObjBookingDataToStateForm;