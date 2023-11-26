
/**
 * @typedef {Object} StateForm
 * @property {string} id - Id текушего редактируемого поля, полученое из id(input).
 * @property {string | number} value - Последнее добавленое значение в форму.
 * @property {Element} target - Обьект текушего редактируемого поля<div className=""></div>
 * @property {string} route - Уникальное имя рейса.
 * @property {string} city - Город назначения.
 * @property {string} dateRoute - Дата вылета.
 * @property {string} timeRoute - Время вылета.
 * @property {number} freePlace - Количество свободных мест.
 * @property {number} company - Перевозчик.
 * @property {string} dateRegistration - Дата регистрации.
 * @property {string} timeRegistration - Время регистрации.
 * @property {string} note - Примечание.
 */

/** 
 * @typedef {Object} FlightsData
 * @property {number} id - Id записи.
 * @property {string} route - Уникальное имя рейса.
 * @property {string} city - Город назначения.
 * @property {string} date - Дата и время вылета.
 * @property {string} company - Комания перевозчик.
 * @property {string} checkIn - Крайний срок регистрации на рейс.
 * @property {number} freePlace - Количество свободных мест в самолете.
 * @property {string} note - Примечание.
 */

/** 
 * @typedef {Object} FilterFlightsData
 * @property {string} moreLessId - Id столбца для сортировки больше/меньше.
 * @property {boolean} moreLessState - Значение сортировки, true - от большего к меньшему, false - наоборот.
 * @property {string} route - Данные сортировки рейса.
 * @property {string} city - Данные сортировки города назначения.
 * @property {string} date - Данные сортировки дата вылета.
 * @property {string} company - Данные сортировки комании.
 * @property {string} checkIn - Данные сортировки даты регистрации на рейс.
 * @property {number} freePlace - Данные сортировки по количества свободных мест в самолете.
 */

/** 
 * @typedef {Object} UseFormFlights 
 * @property {string} stateForm - Состояние для хранения всех данных формы.
 * @property {Function} setStateForm - Функция изминения состояния stateForm через переданный Object.
 * @property {Function} changeInput - Функция изминения состояния stateForm через переданный event.
 * @property {string} stateClassInputDate - Состояние хранения класа для полей даты вылета.
 * @property {string} stateClassDateRegistration - Состояние хранения класа для полей даты регистрации.
 * @property {boolean} isPermitSubmitForm - State хранения доступности отправки данных формы.
 * @property {Function} setIsPermitSubmitForm - Функция изминения состояния isPermitSubmitForm.
 */

/**
 * @typedef {Object} FormBooking
 * @property {number} id - Id текушего редактируемого поля, полученое из id(input).
 * @property {string | number} value - Последнее добавленое значение в форму.
 * @property {Element} target - Обьект текушего редактируемого поля.
 * @property {string} route - Уникальное имя рейса.
 * @property {string} surname - Фамилия пасажира.
 * @property {string} name - Имя пасажира.
 * @property {string} middleName - Отчество пасажира.
 * @property {string} note - Примечание.
 */

/** 
 * @typedef {Object} UseFormBooking
 * @property {FormBooking} stateForm - State с данными формы.
 * @property {Function} setStateForm - Функция обновления данных state.
 * @property {Function} isPermitSubmitForm - State хранения доступности отправки данных формы.
 * @property {Function} setIsPermitSubmitForm - Функция изминения состояния isPermitSubmitForm.
 */

/**
 * @typedef {Object} BookingData
 * @property {number} id - Id записи.
 * @property {string} route - Уникальное имя рейса.
 * @property {string} surname - Фамилия пасажира.
 * @property {string} name - Имя пасажира.
 * @property {string} middleName - Отчество пасажира.
 * @property {string} date - Время регистрации.
 * @property {number} sit - Номер места пасажира.
 * @property {string} note - Примечание.
 */

/**
 * @typedef {Object} FilterBookingData
 * @property {string} moreLessId - Id столбца для сортировки больше/меньше.
 * @property {boolean} moreLessState - Значение сортировки, true - от большего к меньшему, false - наоборот.
 * @property {string} route - Уникальное имя рейса.
 * @property {string} surname - Фамилия пасажира.
 * @property {string} name - Имя пасажира.
 * @property {string} middleName - Отчество пасажира.
 * @property {string} date - Время регистрации.
 * @property {number} sit - Номер места пасажира.
 */

/**
 * @typedef {Object} BookingUpdateData
 * @property {number} id - Id записи.
 * @property {string} surname - Фамилия пасажира.
 * @property {string} name - Имя пасажира.
 * @property {string} middleName - Отчество пасажира.
 */

/**
 * Hook useGetAllBooking return.
 * @typedef {Object} UseGetAllBooking
 * @property {BookingData[]} curentDataBooking - Глобольный массив обьектов с данными бронирования.
 * @property {Function} updateAllBooking - Function обновления глобального состояния с данными брони(curentDataBooking).
 */

/**
 * Hook useGetAllFlights return.
 * @typedef {Object} UseGetAllFlights
 * @property {FlightsData[]} curentDataFlights - Глобольный массив обьектов с данными рейсов.
 * @property {Function} updateAllFlights - Function обновления глобального состояния с данными рейсов(curentDataFlights).
 */

/**
 * @typedef {Object} TotalAllPage
 * @property {number} booking - Количество страниц в таблице booking.
 * @property {number} flights - Количество страниц в таблице flights.
 */










