import { useState } from 'react';
import { httpSQL } from '../service/http.service';

const useTable = (path) => {
    /**
     * selectedLine - Id выбранного обьекта для редактирования или удаления.
     * @type {[number, function(number): void]}
     */
    const [selectedLine, setSelectedLine] = useState(null);

    const editElement = (event) => {
        const idElement = Number(event.target.id);
        if(selectedLine === null || selectedLine !== idElement) {
            setSelectedLine(idElement);
        } else {
            setSelectedLine(null);
        }
    };

    const deleteElement = () => {
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
                    updateAllFlights();
                } else {
                    setSelectedLine(null);
                    alert(`${msg}`);
                }
            })
            .catch(error => console.error(error));
    };
};