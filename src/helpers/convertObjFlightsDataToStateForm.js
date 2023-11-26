import '../types.js'; 

/** Функция конвертации обьекта с type FlightsData в обьект с type StateForm 
 * @param {FlightsData} flightsData 
 * @returns {StateForm}
 */
const convertObjFlightsDataToStateForm = (flightsData) => {
    const state = {
        route: flightsData?.route,
        city: flightsData?.city,
        dateRoute: flightsData?.date.slice(0, 10),
        timeRoute: flightsData?.date.slice(11, 16), 
        company: flightsData?.company,
        dateRegistration: flightsData?.checkIn.slice(0, 10),
        timeRegistration: flightsData?.checkIn.slice(11, 16),
        freePlace: flightsData?.freePlace,
        note: flightsData?.note 
    };

    return state;
};

export default convertObjFlightsDataToStateForm;