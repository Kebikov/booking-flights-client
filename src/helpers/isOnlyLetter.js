import '../types.js'; 

/**
 * Проверка, все есть ли в строке цыфры.
 * @param {StateForm | FormBooking} stateForm - Обьект состояния из state.
 * @param {Function} deleteAddedClasses - Функция удаление дополнительных классов.
 * @return {void} Установит класс в зависимости от результата проверки.
 */
const isOnlyLetter = (stateForm, deleteAddedClasses) => {
    if(/^[a-z, A-Z, а-я, А-Я]+$/i.test(stateForm.value)) {
        deleteAddedClasses();
        stateForm.target.classList.add('is-valid');
    } else {
        deleteAddedClasses();
        stateForm.target.classList.add('is-invalid');
    }
};

export default isOnlyLetter;