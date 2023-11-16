import { useState, useEffect } from 'react';
import { httpSQL } from '../service/http.service.js';

const useFormFlights = () => {
    /**
    * @typedef {Object} StateForm
    * @property {string} route - id рейса
    * @property {string} city - город назначения
    * @property {string} dateRoute - дата вылета
    * @property {string} timeRoute - время вылета
    * @property {number} sit - количество свободных мест
    * @property {string} dateRegistration - дата регистрации
    * @property {string} timeRegistration - время регистрации
    * @property {string} note - примечание
    */

    /**
    * @type {[StateForm, React.Dispatch<React.SetStateAction<StateForm>>]}
    */
    const [stateForm, setStateForm] = useState({});
    const [stateClassInputDate, setStateClassInputDate] = useState('form-control'); 

    console.log('stateForm >>> ', stateForm);

    const changeInput = (event) => {
        
        return () => {
            const target = event.target;
            const id = target.id;
            const value = target.value;

            const deleteAddedClasses = () => {
                target.classList.remove('is-valid');
                target.classList.remove('is-invalid');
            };

            console.log('id = ', id);
            console.log('value = ', value);

            const inputObjectPost = {
                field: id,
                value: value
            };

        

            // если значение пустае удаляем все доп.класы
            if(value === '') {
                console.log(1);
                deleteAddedClasses();
                return;
            }

            const exception = ['city', 'note'];
            // если id есть в исключениях, просто добавляем данные в state и добавляем класс успешной проверки
            if(exception.includes(id)) {
                console.log(2);
                setStateForm(state => ( {...state, [id]: value} ));
                target.classList.add('is-valid');
                return;
            }

            // если передается дата или время вылета заносим данные в state
            if(id === 'dateRoute' || id === 'timeRoute') {
                console.log(3);
                setStateForm(state => ( {...state, [id]: value} ));
                // поскольку обновление state асинхронно, присваеваем пришедшие данные в переменную или берем из state
                const dateRoute = id ==='dateRoute' ? value : stateForm?.dateRoute ? stateForm.dateRoute : '';
                const timeRoute = id ==='timeRoute' ? value : stateForm?.timeRoute ? stateForm.timeRoute : '';
                console.log('data/time = ', dateRoute, timeRoute);
                if(dateRoute && timeRoute) {
                    // формируем дату в формате 2023-12-12T09:00:00
                    // данные в state {"timeRoute": "22:59","dateRoute": "2023-11-08"}
                    const date = `${dateRoute}T${timeRoute}:00`;
                    console.log(date);
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
                return;
            }
    
            // проверка уникальности введенного значения
            if(value) {
                setStateForm(state => ( {...state, [id]: value} ));

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
    return {
        changeInput,
        stateClassInputDate
    };
};

export default useFormFlights;