import { useState, useEffect } from 'react';
import { httpSQL } from '../service/http.service.js';
import '../types.js';
import delayFnc from '../helpers/delay.js';
import isOnlyLetter from '../helpers/isOnlyLetter.js';

const useFormFlights = () => {
    /** 
     * Состояние для хранения всех данных формы.
     * @type {[StateForm, function(StateForm): void]}
     */
    const [stateForm, setStateForm] = useState({
        id: '', value: '-', target: '', route: '', city: '', dateRoute: '', timeRoute: '', 
        freePlace: '', company: '', dateRegistration: '', timeRegistration: '', note: ''
    });
    /** 
     * Состояние хранения класа для полей даты вылета.
     * @typedef {'form-control' | 'form-control is-valid' | 'form-control is-invalid'} InputClass
     * @type {[DateClass, function(DateClass): void]}
     */
    const [stateClassInputDate, setStateClassInputDate] = useState('form-control');
    /**
     * @typedef {boolean} isPermitSubmitForm 
     * State хранения доступности отправки данных формы.
     * - True (отправка данных разрешена).
     * - False (отправка запрешена данных).
     */
    const [isPermitSubmitForm, setIsPermitSubmitForm] = useState(true);
    
    /** 
     * Состояние хранения класа для полей даты регистрации.
     * @type {[InputClass, function(DateClass): void]}
     */
    const [stateClassDateRegistration, setStateClassDateRegistration] = useState('form-control');

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
        //* проверка свободных мест
        if(stateForm.id === 'freePlace') {
            const sit = Number(stateForm.freePlace);
            if(!isNaN(sit) && typeof sit === 'number' && sit < 100 && sit >= 0) {
                deleteAddedClasses();
                stateForm.target.classList.add('is-valid');
            } else {
                deleteAddedClasses();
                stateForm.target.classList.add('is-invalid');
            }
        }
        //* проверка поля на наличие цыфр
        const exception = ['city', 'company'];
        if(exception.includes(stateForm.id)) {
            isOnlyLetter(stateForm, deleteAddedClasses);
            return;
        }
        //* проверка уникальности введенного значения
        if(stateForm.id === 'route') {
            httpSQL
                .post('/check-form-flights', {field: stateForm.id, value: stateForm.value})
                .then(res => {
                    const msg = res.data?.msg;
                    if(msg === undefined || msg === 'route not found') return;
                    if(msg) {
                        deleteAddedClasses();
                        stateForm.target.classList.add('is-valid');
                    } else {
                        deleteAddedClasses();
                        stateForm.target.classList.add('is-invalid');
                    }
                })
                .catch(error => console.error(error));
        } 
        //* проверка наличия данных в поле note
        if(stateForm.id === 'note') {
            stateForm.target.classList.add('is-valid');
            return;
        }
        //* проверка разрешон ли вылет в данное время, не более 2-х в одно итоже время и дату
        if(stateForm.id === 'dateRoute' || stateForm.id === 'timeRoute') {
            if(stateForm.dateRoute && stateForm.timeRoute) {
                // формируем дату в формате 2023-12-12T09:00:00
                // данные в state {"timeRoute": "22:59","dateRoute": "2023-11-08"}
                const date = `${stateForm.dateRoute}T${stateForm.timeRoute}:00`;
                httpSQL
                    .post('/check-form-flights', {field: 'date', value: date})
                    .then(res => {
                        const msg = res.data?.msg;
                        if(msg === undefined || msg === 'route not found') return;
                        if(msg) {
                            setStateClassInputDate('form-control is-valid');
                            checkTime();
                        } else {
                            setStateClassInputDate('form-control is-invalid');
                        }
                    })
                    .catch(error => console.error(error));
            }
        }
        //* проверка времени на соответствие условий 
        if(stateForm.id === 'dateRegistration' || stateForm.id === 'timeRegistration') {
            checkTime();
        }
    };

    /** 
     * Проверка разницы времени вылета и регистрации.
     * @return {void} Изменит класс времени.
     */
    function checkTime() {
        //* проверка разницы времени вылета и регистрации, если есть все необходимые данные
        if(stateForm.dateRoute && stateForm.timeRoute && stateForm.dateRegistration && stateForm.timeRegistration) {
            const min30 = 30 * 60 * 1000;
            const timeFlightsRoute = `${stateForm.dateRoute}T${stateForm.timeRoute}:00`;
            const timeFlightsRegistration = `${stateForm.dateRegistration}T${stateForm.timeRegistration}:00`;
            const timeDifference = new Date(timeFlightsRoute).getTime() - new Date(timeFlightsRegistration).getTime();
            
            if(timeDifference >= min30) {
                setStateClassDateRegistration('form-control is-valid');
            } else {
                setStateClassDateRegistration('form-control is-invalid');
            }
        }
    }

    useEffect(() => {
        if(stateForm.id) delayFnc(checkData, 1000);
    }, [stateForm]); // eslint-disable-line

    return {
        stateForm,
        setStateForm,
        stateClassInputDate,
        stateClassDateRegistration,
        isPermitSubmitForm, 
        setIsPermitSubmitForm
    };
};

export default useFormFlights;



