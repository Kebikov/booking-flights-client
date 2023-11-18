import { useState, useEffect } from 'react';
import { httpSQL } from '../service/http.service.js';

const useFormFlights = () => {
    /**
    * @typedef {Object} StateForm
    * @property {string} id - id текушего редактируемого поля
    * @property {object} target - обьект текушего редактируемого поля
    * @property {string} route - id рейса
    * @property {string} city - город назначения
    * @property {string} dateRoute - дата вылета
    * @property {string} timeRoute - время вылета
    * @property {number} freePlace - количество свободных мест
    * @property {number} company - перевозчик
    * @property {string} dateRegistration - дата регистрации
    * @property {string} timeRegistration - время регистрации
    * @property {string} note - примечание
    */
    /**
    * @type {[StateForm, React.Dispatch<React.SetStateAction<StateForm>>]}
    * @description Состояние для хранения всех данных формы
    */
    const [stateForm, setStateForm] = useState({});

    /**
    * Состояние хранения класа для полей даты вылета
    * @typedef {'form-control' | 'form-control is-valid' | 'form-control is-invalid'} DateClass
    * @type {[DateClass, function(DateClass): void]}
    */
    const [stateClassInputDate, setStateClassInputDate] = useState('form-control'); 

    /**
    * Состояние хранения класа для полей даты регистрации
    * @type {[DateClass, function(DateClass): void]}
    */
    const [stateClassDateRegistration, setStateClassDateRegistration] = useState('form-control');

    /**
    * Функция преобразует строку с временем в минуты
    * @param {Event} event обьект события
    * @return {void} ни чего не возврашает
    */

    const changeInput = (event) => {
        
        return () => {
            const target = event.target;
            const id = target.id;
            const value = target.value;

            const deleteAddedClasses = () => {
                target.classList.remove('is-valid');
                target.classList.remove('is-invalid');
            };

            const inputObjectPost = {
                field: id,
                value: value
            };

            //* если значение пустае удаляем все доп.класы
            if(value === '') {
                deleteAddedClasses();
                return;
            }

            //* если id есть в исключениях, просто добавляем данные в state и добавляем класс успешной проверки
            const exception = ['city', 'company', 'note'];
            if(exception.includes(id)) {
                setStateForm(state => ( {...state, [id]: value, id, target} ));
                target.classList.add('is-valid');
                return;
            }

            //* проверка свободных мест
            if(id === 'freePlace') {
                const sit = Number(value);
                if(!isNaN(sit) && typeof sit === 'number' && sit < 100 && sit >= 0) {
                    deleteAddedClasses();
                    target.classList.add('is-valid');
                    setStateForm(state => ( {...state, [id]: value, id, target} ));
                } else {
                    deleteAddedClasses();
                    target.classList.add('is-invalid');
                }
            }

            //* добавление данных вылета
            if(id === 'dateRoute' || id === 'timeRoute') {
                setStateForm(state => ( {...state, [id]: value, id, target} ));
            }

            //* добавление регистрации рейса
            if(id === 'dateRegistration' || id === 'timeRegistration') {
                setStateForm(state => ( {...state, [id]: value, id, target} ));
                return;
            }
    
            //* проверка уникальности введенного значения
            if(id === 'route') {
                setStateForm(state => ( {...state, [id]: value, id, target} ));

                httpSQL
                    .post('/check-form-flights', inputObjectPost)
                    .then(res => {
                        const msg = res.data?.msg;
                        if(msg === undefined || msg === 'route not found') return;
                        if(msg) {
                            deleteAddedClasses();
                            target.classList.add('is-valid');
                        } else {
                            deleteAddedClasses();
                            target.classList.add('is-invalid');
                        }
                    })
                    .catch(error => console.error(error));
            } 
        };
    };

    useEffect(() => {

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
                        } else {
                            setStateClassInputDate('form-control is-invalid');
                        }
                    })
                    .catch(error => console.error(error));
            }
        }

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

    }, [stateForm]);

    return {
        stateForm,
        changeInput,
        stateClassInputDate,
        stateClassDateRegistration
    };
};

export default useFormFlights;

