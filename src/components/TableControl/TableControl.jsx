import 'bootstrap/dist/css/bootstrap.css';
import '../../scss/public.scss';
import '../../types.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setTotalLineInPage } from '../../redux/slice/sliceForm';

/**
 * @typedef {'flights' | 'booking'} Table
 */

/**
 * @typedef {Object} Propse
 * @property {number} choice - State, id выбранного обьекта для редактирования или удаления.
 * @property {Function} deleteElement - Function, удаление брони.
 * @property {Table} table - Имя таблицы.
 */

/** 
 * COMPONENT > Блок управления в таблице.
 * @component
 * @example
 * <TableControl 
 *     choice={...} 
 *     deleteElement={...} 
 *     table={...} 
 * />
 * @param {Propse} 
 */
//= TableControl 
const TableControl = ({choice, deleteElement, table}) => {

    let pathAdd;
    let pathEdit;

    switch (table) { 
        case 'flights':
            pathAdd = '/add-flights';
            pathEdit = '/edit-flights';
            break;
        case 'booking':
            pathAdd = '/add-booking';
            pathEdit = '/edit-booking';
            break;
        default: 
            pathAdd = '';
            pathEdit = '';
            break;
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    /**
     * @type {number} totalLineInPage 
     * - Установленое количество отображаемых записей.
     */
    const totalLineInPage = useSelector(state => state.sliceForm.totalLineInPage);
    /**
     * @type {number} currentPage 
     * - Номер текушей просматриваемой страницы.
     */
    const currentPage = useSelector(state => state.sliceForm.currentPage);
    /**
     * @type {TotalAllPage} totalAllPageObj 
     * - Обьект с количеством страниц.
     */
    const totalAllPageObj = useSelector(state => state.sliceForm.totalAllPageObj);

    //* изминение текушей отображаемой страницы
    const changeCurrentPage = (event) => {
        const value = Number(event.target.value);
        // работа в таблице Flights
        if(totalAllPageObj[table] === 1) return;
        if(currentPage === 1 && value === -1) return;
        if(currentPage === totalAllPageObj[table] && value === 1) return;
        dispatch( setCurrentPage(currentPage + value) );
    };

    //* изминение количества отображаемых записей
    const changeTotalLineInPage = (event) => {
        const value = Number(event.target.value);
        dispatch( setTotalLineInPage(value) );
    };

    const editLine = () => {
        if(choice) {
            navigate(`${pathEdit}/${choice}`);
        }
    };


    return(
        <div className="table-control">
            <div className="table-control__body">
                {/* Buttons Add/Edit/Delete */}
                <div 
                    className="btn-group table-control__btn-group" 
                    role="group" 
                    aria-label="Basic outlined example"
                >
                    <button 
                        type="button" 
                        className="btn btn-outline-primary"
                        onClick={() => navigate(pathAdd)}
                    >
                        add
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-outline-primary"
                        onClick={editLine}
                    >
                        edit
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-outline-primary" 
                        onClick={deleteElement}
                    >
                        del
                    </button>
                </div>
                {/* Page Navigation */}
                <div 
                    aria-label="Page Navigation"
                    className="btn-group table-control__btn-group" 
                >
                    <button 
                        type="button" 
                        className="btn btn-outline-primary"
                        value={-1}
                        onClick={changeCurrentPage}
                    >
                        &laquo;
                    </button>
                    <div className="page-list" >
                        {
                            totalAllPageObj[table] === 0 ?
                                'Нет данных'
                                :
                                `Стр. ${currentPage} из ${totalAllPageObj[table]}`
                        }
                    </div>
                    <button 
                        type="button" 
                        className="btn btn-outline-primary" 
                        value={1}
                        onClick={changeCurrentPage}
                    >
                        &raquo;
                    </button>
                </div>
                {/* Select 5/10/15 */}
                <select 
                    value={totalLineInPage} 
                    onChange={changeTotalLineInPage}
                    className="form-select table-control__select" 
                >
                    <option value={5}>выводить по 5</option>
                    <option value={10}>выводить по 10</option>
                    <option value={15}>выводить по 15</option>
                </select>
            </div>
        </div>
    );
};

export default TableControl;