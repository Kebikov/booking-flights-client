import * as Types from '../types.js'; // eslint-disable-line 

/** Функция конвертации обьекта с type StateForm  в обьект с type FlightsData
 * @param {Types.StateForm} flightsData 
 * @returns {Types.FlightsData}
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