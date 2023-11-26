import '../types.js'; 
import { useState, useEffect } from 'react';
import delayFnc from '../helpers/delay.js';
import { httpSQL } from '../service/http.service.js';
import isOnlyLetter from '../helpers/isOnlyLetter.js';


const useFormBooking = () => {

    /** 
     * State для хранения всех данных формы
     * @type {[FormBooking, function(FormBooking): void]}
     */
    const [stateForm, setStateForm] = useState({
        id: '', value: '', target: '', route: '', surname: '', name: '',
        middleName: '', note: ''
    });
    /**
     * @typedef {boolean} isPermitSubmitForm 
     * State хранения доступности отправки данных формы.
     * - True (отправка данных разрешена).
     * - False (отправка запрешена данных).
     */
    const [isPermitSubmitForm, setIsPermitSubmitForm] = useState(true);

    const deleteAddedClasses = () => {
        stateForm.target.classList.remove('is-valid');
        stateForm.target.classList.remove('is-invalid');
    };

    
    /** 
     * Функция вылидации формы.
     * @return {void}
     */
    const checkData = () => {
        setIsPermitSubmitForm(true);
        //* если значение пустае удаляем все доп.класы
        if(stateForm.value === '') {
            deleteAddedClasses();
            return;
        }
        //* проверка есть ли искомый рейс в БД
        if(stateForm.id === 'route') {
            httpSQL
                .post('/check-form-flights', {field: 'route', value: stateForm.route})
                .then(res => {
                    const msg = res.data?.msg;
                    if(msg === undefined || msg === 'route not found') return;
                    if(msg) {
                        deleteAddedClasses();
                        stateForm.target.classList.add('is-invalid');
                    } else {
                        deleteAddedClasses();
                        stateForm.target.classList.add('is-valid');
                    }
                })
                .catch(error => console.error(error));
        }
        //* если id есть в исключениях, просто добавляем класс
        const exception = ['surname', 'name', 'middleName'];
        if(exception.includes(stateForm.id)) {
            isOnlyLetter(stateForm, deleteAddedClasses);
            return;
        }
        //* проверка наличия данных в поле note
        if(stateForm.id === 'note') {
            stateForm.target.classList.add('is-valid');
            return;
        }
    };

    useEffect(() => {
        if(stateForm.id) delayFnc(checkData, 1000);
    }, [stateForm]); // eslint-disable-line

    return {
        stateForm,
        setStateForm,
        isPermitSubmitForm, 
        setIsPermitSubmitForm
    };
};

export default useFormBooking;