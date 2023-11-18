import { useState, useEffect } from 'react';
import { httpSQL } from '../service/http.service.js';
import * as Types from '../types.js'; // eslint-disable-line 

const useFormFlights = () => {

    /** Состояние для хранения всех данных формы
    * @type {[Types.StateForm, function(Types.StateForm): void]}
    */
    const [stateForm, setStateForm] = useState({});

    /** Состояние хранения класа для полей даты вылета
    * @typedef {'form-control' | 'form-control is-valid' | 'form-control is-invalid'} DateClass
    * @type {[DateClass, function(DateClass): void]}
    */
    const [stateClassInputDate, setStateClassInputDate] = useState('form-control'); 

    /** Состояние хранения класа для полей даты регистрации
    * @type {[DateClass, function(DateClass): void]}
    */
    const [stateClassDateRegistration, setStateClassDateRegistration] = useState('form-control');

    /** Функция отслежеваюшая изминения состояния input
    * @param {Event} event обьект события
    * @return {void}
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
                console.log('id = ', id);
                console.log('value = ', value);
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
            console.log(111);
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
            console.log(stateForm.id);
            checkTime();
        }


        function checkTime() {
            console.log('fnc checkTime');
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

    }, [stateForm]);

    return {
        stateForm,
        setStateForm,
        changeInput,
        stateClassInputDate,
        stateClassDateRegistration
    };
};

export default useFormFlights;



