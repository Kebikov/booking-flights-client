
/**
* @typedef {Object} StateForm
* @property {string} id - id текушего редактируемого поля, полученое из id(input)
* @property {string | number} value - последнее добавленое значение в форму
* @property {Element} target - обьект текушего редактируемого поля
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
* @typedef {Object} FlightsData
* @property {number} id - id рейса
* @property {string} route - уникальное имя рейса
* @property {string} city - город назначения
* @property {string} date - дата и время вылета
* @property {string} company - комания перевозчик
* @property {string} checkIn - крайний срок регистрации на рейс
* @property {number} freePlace - количество свободных мест в самолете
* @property {string} note - примечание
*/

/** 
* @typedef {Object} UseFormFlights
* @property {string} stateForm - Состояние для хранения всех данных формы.
* @property {Function} setStateForm - Функция изминения состояния stateForm через переданный Object.
* @property {Function} changeInput - Функция изминения состояния stateForm через переданный event.
* @property {string} stateClassInputDate - Состояние хранения класа для полей даты вылета.
* @property {string} stateClassDateRegistration - Состояние хранения класа для полей даты регистрации.
*/

/**
* @typedef {Object} FormBooking
* @property {number} id - id из DB
* @property {string | number} value - последнее добавленое значение в форму
* @property {Element} target - обьект текушего редактируемого поля
* @property {string} route - уникальное имя рейса
* @property {string} surname - фамилия пасажира
* @property {string} name - имя пасажира
* @property {string} middleName - отчество пасажира
* @property {string} date - дата бронирования(устанавливается автоматически в момент брони)
* @property	{number} sit - сидение(устанавливается автоматически)
* @property {string} note - примечание
*/

export const Types = {};