import 'bootstrap/dist/css/bootstrap.css';
import '../PopUpFormFlights/popUpFormFlights.scss';
import * as Types from '../../types.js'; // eslint-disable-line 

import { useNavigate } from 'react-router-dom';
import { httpSQL } from '../../service/http.service.js';

import delay from '../../helpers/delay.js';
import useFormFlights from '../../hooks/useFormFlights.js';
import useGetAllFlights from '../../hooks/useGetAllFlights.js';
import { useEffect } from 'react';

/** COMPONENT > Форма для редактирования рейса в БД
* @component
* @example
* <PopUpEditFormFlights id={...} />
* @param {number} id - id рейса 
*/
//= PopUpEditFormFlights 
const PopUpEditFormFlights = ({id}) => {

    const navigate = useNavigate();

    /** Результат использования функции useFormFlights.
     * @type {Types.UseFormFlights} */ 
    const {stateForm, setStateForm, changeInput, stateClassInputDate, stateClassDateRegistration} = useFormFlights();
    console.log(stateForm);
    /** Результат использования функции useFormFlights.
    * @property {Types.FlightsData[]} curentDataFlights - Массив со всеми рейсами.
    * @property {function} updateAllFlights - Функция обновления данных о рейсах.
    */
    const {curentDataFlights, updateAllFlights} = useGetAllFlights();

    const submitFormFlights = (event) => { 
        event.preventDefault();
        const form = event.target;
        const isInvalidElements = form.querySelectorAll('.is-invalid');

        if(isInvalidElements?.length === 0) {
            const bodyForm = {
                route: stateForm.route,
                city: stateForm.city,
                date: `${stateForm.dateRoute}T${stateForm.timeRoute}:00`,
                company: stateForm.company,
                checkIn: `${stateForm.dateRegistration}T${stateForm.timeRegistration}:00`,
                freePlace: Number (stateForm.freePlace),
                note: stateForm?.note ?? '' 
            };
            httpSQL
                .post('/form-flights', bodyForm)
                .then(res => {
                    form.reset();
                    navigate(-1);
                })
                .catch(error => console.error(error));
        } else {
            console.log('нет');
        }
    };

    const changeInputDelay = delay(changeInput, 500);
    
    useEffect(() => {

        if(Array.isArray(curentDataFlights) && curentDataFlights.length > 0) {
            
            /** editFlights - обьект с данными рейса
            * @type {Types.FlightsData} */
            const editFlights = curentDataFlights.find(flights => flights.id === id);
            
            const state = {
                route: editFlights?.route,
                city: editFlights?.city,
                dateRoute: editFlights?.date.slice(0, 10),
                timeRoute: editFlights?.date.slice(11, 16), 
                company: editFlights?.company,
                dateRegistration: editFlights?.checkIn.slice(0, 10),
                timeRegistration: editFlights?.checkIn.slice(11, 16),
                freePlace: editFlights?.freePlace,
                note: editFlights?.note 
            };

            setStateForm(state);
        }

    },[curentDataFlights]);

    useEffect(() => {
        if(curentDataFlights.length === 0) {
            updateAllFlights();
        }
    },[]); // eslint-disable-line

    return(
        <div className="popup-form-flights">
            <div className="popup-form-flights__body">
                <form className="form-floating" onSubmit={submitFormFlights} >
                    {/*//* рейс */}
                    <div className="col-md-4 popup-form-flights__col">
                        <label htmlFor="route" className="form-label">Рейс</label>
                        <input 
                            id="route" 
                            type="text"
                            className="form-control" 
                            onChange={changeInput}
                            value={stateForm.route}
                            //readOnly
                        />
                    </div>
                    {/*//* город */}
                    <div className="col-md-4 mt-2 popup-form-flights__col">
                        <label htmlFor="city" className="form-label">Город</label>
                        <input 
                            id="city" 
                            type="text" 
                            className="form-control"
                            value={stateForm.city}
                            readOnly
                        />
                    </div>
                    {/*//* дата */}
                    <div className="col-md-4 mt-2 popup-form-flights__col">
                        <label htmlFor="dateRoute" className="form-label">Дата рейса</label>
                        <input 
                            id="dateRoute" 
                            onChange={changeInputDelay}
                            type="date" 
                            className={stateClassInputDate}
                            value={stateForm.dateRoute}
                            autoComplete="off"
                            required
                        />
                        <div className="valid-feedback">
                            ok!
                        </div>
                        <div id="dateRoute" className="invalid-feedback">
                            Выберите другую дату или время рейса.
                        </div>
                    </div>
                    {/*//* время */}
                    <div className="col-md-4 mt-2 popup-form-flights__col">
                        <label htmlFor="timeRoute" className="form-label">Время рейса</label>
                        <input 
                            id="timeRoute"
                            onChange={changeInputDelay}
                            type="time" 
                            className={stateClassInputDate}
                            value={stateForm.timeRoute}
                            required
                        />
                        <div className="valid-feedback">
                            ok!
                        </div>
                        <div id="timeRoute" className="invalid-feedback">
                            Выберите другую дату или время рейса.
                        </div>
                    </div>
                    {/*//* Авиакомпания */}
                    <div className="col-md-4 mt-2 popup-form-flights__col">
                        <label htmlFor="company" className="form-label">Авиакомпания</label>
                        <input 
                            id="company"
                            type="text"
                            className="form-control"
                            value={stateForm.company}
                            readOnly
                        />
                    </div>
                    {/*//* Количество свободных мест */}
                    <div className="col-md-4 mt-2 popup-form-flights__col">
                        <label htmlFor="freePlace" className="form-label">Количество свободных мест</label>
                        <input 
                            id="freePlace"
                            type="text"
                            className="form-control"
                            value={stateForm.freePlace}
                            readOnly
                        />
                    </div>
                    {/*//* дата регистрации*/}
                    <div className="col-md-4 mt-2 popup-form-flights__col">
                        <label htmlFor="dateRegistration" className="form-label">Дата регистрации</label>
                        <input 
                            id="dateRegistration"
                            onChange={changeInputDelay}
                            type="date"
                            className={stateClassDateRegistration}
                            value={stateForm.dateRegistration}
                            required
                        />
                        <div className="valid-feedback">
                            ok!
                        </div>
                        <div id="dateRegistration" className="invalid-feedback">
                            Регистрация минимум за 30 минут до рейса.
                        </div>
                    </div>
                    {/*//* время регистрации*/}
                    <div className="col-md-4 mt-2 popup-form-flights__col">
                        <label htmlFor="timeRegistration" className="form-label">Время рейса</label>
                        <input 
                            id="timeRegistration" 
                            onChange={changeInputDelay}
                            type="time" 
                            className={stateClassDateRegistration}
                            value={stateForm.timeRegistration}
                            required
                        />
                        <div className="valid-feedback">
                            ok!
                        </div>
                        <div id="timeRegistration" className="invalid-feedback">
                            Регистрация минимум за 30 минут до рейса.
                        </div>
                    </div>
                    {/*//* Примечание */}
                    <div className="col-md-4 mt-2 popup-form-flights__col">
                        <label htmlFor="note" className="form-label">Примечание</label>
                        <input 
                            id="note"
                            onChange={changeInputDelay}
                            type="text" 
                            className="form-control"
                            value={stateForm.note}
                            readOnly
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="btn btn-primary mt-4"
                    >отправить
                    </button>
                    <button 
                        type="submit" 
                        className="btn btn-secondary mt-4" 
                        style={{marginLeft: '20px'}} 
                        onClick={() => navigate(-1)}
                    >отмена
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PopUpEditFormFlights;