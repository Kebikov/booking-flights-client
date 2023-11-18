

const delay = (someFunction, timeDelay) => {
    let timeOut;
    console.log('del');
    return function () {
        clearTimeout(timeOut);
        function call() {
            someFunction.call(this);
        };
        timeOut = setTimeout(() => {
            call();
        }, timeDelay);
    };
};
/**
* Функция задержки выполнения переденной функции.
* @param {Function} someFunction Функция выполнение которой надо отложить на установленое время.
* @param {number} timeDelay Время задержки в мс.
*/

export default delay;






