
const delay = () => {
    let timeOut;
    return function (someFunction, timeDelay) {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            someFunction();
        }, timeDelay);
    };
};
/**
* Функция задержки выполнения переденной функции.
* @param {Function} someFunction Функция выполнение которой надо отложить на установленое время.
* @param {number} timeDelay Время задержки в мс.
*/
const delayFnc = delay();

export default delayFnc;






