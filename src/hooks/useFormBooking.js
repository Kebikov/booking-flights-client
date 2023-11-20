import * as Types from '../types.js'; // eslint-disable-line 
import { useState } from 'react';

const useFormBooking = () => {

    /** State для хранения всех данных формы
    * @type {[Types.FormBooking, function(Types.FormBooking): void]}
    */
    const [stateForm, setStateForm] = useState({
        id: '', value: '', target: '', route: '', surname: '', name: '', 
        middleName: '', date: '', sit: '', note: ''
    });

    /** Функция изминения state, при изминении input.
    * @param {Event} event - Обьект события.
    * @return {void} Устанавливает state.
    */
    const changeInput = (event) => {
        const target = event.target;
        const id = target.id;
        const value = target.value;
        setStateForm(state => ( {...state, [id]: value, id, target, value} ));
    };

    return {
        stateForm,
        setStateForm,
        changeInput
    };
};

export default useFormBooking;