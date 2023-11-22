//@ts-check
import './clock.scss';
import React, { useState, useEffect } from 'react';
import { httpAdmin } from '../../service/http.service';


/** Component для отображения текущей даты и времени.
* - получает начальное время c server
* @component
* @example
* Пример использования компонента <Clock />:
* <Clock /> */
//= Clock 
const Clock = () => {
    /** 
     * State текушего времени в формате number 
     * - переменнная вида new Date().getTime()
     * @typedef {number} curentDate
     */
    const [curentDate, setCurentDate] = useState(0);

    /** Отображаемая дата на экране. * @type {string} */
    let dateView = '';

    /** Отображаемое время на экране * @type {string} */
    let timeView = '';

    /** Переменная хранения таймера * @type {Object} */
    let timer;

    if(curentDate) {
        const time = new Date(curentDate);
        dateView = time.toLocaleDateString('ru-RU');

        const hours = String( time.getHours() );
        const minutes = String( time.getMinutes() );
        timeView = `${hours.padStart(2,'0')}:${minutes.padStart(2,'0')}`;
    }
    
    /** 
     * Функция изминения времени
     * - каждую секунду устанавливаем новое значение time
     * - если минуты изминились меняем состояние передав новое значение времени в setCurentDate
     * @param {number} data время в виде числа в мс., которое получаем в new Date().getTime()
     */
    const goTime = (data) => {
        try {
            
            if(typeof data !== 'number')  throw new Error('Не правильный формат аргумента data, ожидает number');
            const time = new Date(data);
            timer = setTimeout(() => {
                const minute = time.getMinutes();
                time.setSeconds(time.getSeconds() + 1);

                if(minute !== time.getMinutes()) {
                    const newTime = time.getTime();
                    setCurentDate(newTime);
                }
                goTime( time.getTime() );
            }, 1000);
        } catch(error) {
            return console.error(error);
        }
    };

    useEffect(() => {
        httpAdmin
            .get('/curent-time')
            .then(res => {
                /** 
                 * Данные с server.
                 * - Переменнная вида new Date().getTime().
                 * @type {number}
                */
                const data = res.data.time;
                setCurentDate(data);
                goTime(data);
            })
            .catch(error => console.error('Error fetching data:', error));
        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line
    },[]);

    return(
        <div className="clock">
            <div className="clock__boby">
                <div className="clock__date">
                    <div className="clock__title">Сегодня</div>
                    <div className="clock__day">{dateView}</div>
                </div>
                <div className="clock__time">{timeView}</div>
            </div>
        </div>
    );
};

export default Clock;

