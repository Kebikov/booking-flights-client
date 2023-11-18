import { useState, useEffect } from 'react';
import { httpSQL } from '../service/http.service.js';
import * as Types from '../types.js'; // eslint-disable-line 
import delay from '../helpers/delay.js';

const useFormFlights = () => {

    /** Состояние для хранения всех данных формы
    * @type {[Types.StateForm, function(Types.StateForm): void]}
    */
    const [stateForm, setStateForm] = useState({
        id: '',
        value: '-',
        target: '',
        route: '',
        city: '',
        dateRoute: '',
        timeRoute: '',
        freePlace: '',
        company: '',
        dateRegistration: '',
        timeRegistration: '',
        note: ''
    });

    /** Состояние хранения класа для полей даты вылета
    * @typedef {'form-control' | 'form-control is-valid' | 'form-control is-invalid'} DateClass
    * @type {[DateClass, function(DateClass): void]}
    */
    const [stateClassInputDate, setStateClassInputDate] = useState('form-control'); 

    /** Состояние хранения класа для полей даты регистрации
    * @type {[DateClass, function(DateClass): void]}
    */
    const [stateClassDateRegistration, setStateClassDateRegistration] = useState('form-control');

    const deleteAddedClasses = () => {
        stateForm.target.classList.remove('is-valid');
        stateForm.target.classList.remove('is-invalid');
    };

    /** Функция отслежеваюшая изминения состояния input
    * @param {Event} event обьект события
    * @return {void}
    */
    const changeInput = (event) => {
        const target = event.target;
        const id = target.id;
        const value = target.value;
        setStateForm(state => ( {...state, [id]: value, id, target, value} ));
    };

    
    const dalayCheckData = delay(checkData, 1500);


    useEffect(() => {
        dalayCheckData();
    }, [stateForm]);

    function checkData() {
        console.log('checkData');
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

        //* если id есть в исключениях, просто добавляем данные в state и добавляем класс успешной проверки
        const exception = ['city', 'company', 'note'];
        if(exception.includes(stateForm.id)) {
            stateForm.target.classList.add('is-valid');
            return;
        }

        //* проверка уникальности введенного значения
        if(stateForm.id === 'route') {
            console.log(stateForm.value);
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

        if(stateForm.id === 'dateRegistration' || stateForm.id === 'timeRegistration') {
            checkTime();
        }
    }

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

    return {
        stateForm,
        setStateForm,
        changeInput,
        stateClassInputDate,
        stateClassDateRegistration
    };
};

export default useFormFlights;



