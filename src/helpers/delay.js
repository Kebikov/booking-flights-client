const delay = () => {
    let timeOut;
    return (someFunction, timeDelay) => {
            clearTimeout(timeOut);
            timeOut = setTimeout(() => someFunction(), timeDelay);
    };
};
/**
* Функция задержки выполнения переденной функции.
* @param {Function} someFunction Функция выполнение которой надо отложить на установленое время.
* @param {number} timeDelay Время задержки в мс.
* @return {Function} Вернет функцию которая задержит выполнение переданной функции.
* @example Пример использования delayFnc :
* const btn = document.getElementById('button');
* btn.addEventListener('click', () => delayFnc(fncClick, 1000));
*/
const delayFnc = delay();

export default delayFnc;
