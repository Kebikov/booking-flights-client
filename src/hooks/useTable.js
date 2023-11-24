import { useState } from 'react';
import { httpSQL } from '../service/http.service.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../redux/slice/sliceForm.js';


/**
 * @typedef {Object} HookReturnUseTable
 * @property {number} selectedLine - Id выбранного обьекта для редактирования или удаления.
 * @property {Function} choiceLine - Функция выбора записи для дальнейшей работы с ней.
 * @property {Function} deleteLine - Функция удаления записи.
 */

/**
 * Hook для работы с таблицами Booking и Flights.
 * @param {string} path - Путь адресной строки ("/delete-booking").
 * @param  {Function[]} upDateFunctions - Функции обновления данных.
 * @example
 * const {} = useTable(path, ...upDateFunctions);
 * @returns {HookReturnUseTable}
 */
//= useTable 
const useTable = (path, ...upDateFunctions) => {

    const dispatch = useDispatch();

    /**
     * selectedLine - Id выбранного обьекта для редактирования или удаления.
     * @type {[number, function(number): void]}
     */
    const [selectedLine, setSelectedLine] = useState(null);

    const choiceLine = (event) => {
        const idLine = Number(event.target.id);
        if(selectedLine === null || selectedLine !== idLine) {
            setSelectedLine(idLine);
        } else {
            setSelectedLine(null);
        }
    };

    const deleteLine = () => {
        if(selectedLine === null) {
            alert('Выберите рейс для удаления. Нажмите на номер рейса.');
            return;
        }

        httpSQL
            .delete(`${path}`, {data: {id: selectedLine} })
            .then(res => {
                const msg = res.data?.msg;
                if(msg === 'ENTRY_DELETED') {
                    setSelectedLine(null);
                    upDateFunctions.forEach(someFunction => someFunction());
                } else {
                    setSelectedLine(null);
                    alert(`${msg}`);
                }
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        return () => {
            dispatch( setCurrentPage('DEFAULT_VALUE_CURRENT_PAGE') );
        };
    },[]); // eslint-disable-line

    return {
        choiceLine,
        deleteLine,
        selectedLine
    };

};

export default useTable;


