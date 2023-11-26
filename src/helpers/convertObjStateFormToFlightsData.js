import '../types.js'; 

/** Функция конвертации обьекта с type StateForm  в обьект с type FlightsData
 * @param {StateForm} flightsData 
 * @returns {FlightsData}
 */
const convertObjStateFormToFlightsData = (stateForm) => {

    const state = {
        route: stateForm.route,
        city: stateForm.city,
        date: `${stateForm.dateRoute}T${stateForm.timeRoute}:00`,
        company: stateForm.company,
        checkIn: `${stateForm.dateRegistration}T${stateForm.timeRegistration}:00`,
        freePlace: Number (stateForm.freePlace),
        note: stateForm?.note ?? '' 
    };

    return state;
};

export default convertObjStateFormToFlightsData;