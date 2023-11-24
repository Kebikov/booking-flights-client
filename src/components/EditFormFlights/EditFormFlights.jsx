import 'bootstrap/dist/css/bootstrap.css';
import '../FormFlights/formFlights.scss';
import * as Types from '../../types.js'; // eslint-disable-line 
import convertObjFlightsDataToStateForm from '../../helpers/convertObjFlightsDataToStateForm.js';
import convertObjStateFormToFlightsData from '../../helpers/convertObjStateFormToFlightsData.js';
import { useNavigate } from 'react-router-dom';
import { httpSQL } from '../../service/http.service.js';
import useFormFlights from '../../hooks/useFormFlights.js';
import useGetAllFlights from '../../hooks/useGetAllFlights.js';
import { useEffect } from 'react';
import changeInput from '../../helpers/changeInput.js';

/** 
 * COMPONENT > Форма для редактирования рейса в БД
 * @component
 * @example
 * <EditFormFlights id={...} />
 * @param {number} id - id рейса 
 */
//= EditFormFlights 
const EditFormFlights = ({id}) => {

    const navigate = useNavigate();
    /** 
     * Результат использования функции useFormFlights.
     * @type {Types.UseFormFlights} 
     */ 
    const {
        stateForm, 
        setStateForm, 
        stateClassInputDate, 
        stateClassDateRegistration,
        isPermitSubmitForm,
        setIsPermitSubmitForm
    } = useFormFlights();
    
    /** 
     * Результат использования функции useFormFlights.
     * @property {Types.FlightsData[]} curentDataFlights - Массив со всеми рейсами.
     * @property {function} updateAllFlights - Функция обновления данных о рейсах.
     */
    const {curentDataFlights, updateAllFlights} = useGetAllFlights();

    /**
     * Отправка данных на сервер при submit
     * @param {Event} event 
     */
    const submitFormFlights = (event) => { 
        event.preventDefault();
        const form = event.target;
        const isInvalidElements = form.querySelectorAll('.is-invalid');

        if(isInvalidElements?.length === 0) {
            const body = convertObjStateFormToFlightsData(stateForm);
            body.id = id;
            httpSQL
                .patch('/patch-flights', body)
                .then(() => {
                    updateAllFlights();
                    form.reset();
                    navigate(-1);
                })
                .catch(error => console.error(error));
        }
    };

    const change = (event) => changeInput(event, setStateForm, setIsPermitSubmitForm);
    
    useEffect(() => {
        if(Array.isArray(curentDataFlights) && curentDataFlights.length > 0) {
            /** editFlights - обьект с данными рейса
            * @type {FlightsData} */
            const editFlights = curentDataFlights.find(flights => flights.id === id);
            const state = convertObjFlightsDataToStateForm(editFlights);
            setStateForm(state);
        }
        httpSQL
            .get(`/get-flights/${id}`)
            .then(res => {
                const state = convertObjFlightsDataToStateForm(res.data);
                setStateForm(state);
            })
            .catch(err => console.error(err));
    },[]); // eslint-disable-line

    return(
        <div className="popup-form-flights">
            <div className="popup-form-flights__body">
                <form className="form-floating" onSubmit={submitFormFlights} >
                    {/*//* дата */}
                    <div className="col-md-4 mt-2 popup-form-flights__col">
                        <label htmlFor="dateRoute" className="form-label">Дата рейса</label>
                        <input 
                            id="dateRoute" 
                            onChange={change}
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
                            onChange={change}
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
                    {/*//* дата регистрации*/}
                    <div className="col-md-4 mt-2 popup-form-flights__col">
                        <label htmlFor="dateRegistration" className="form-label">Дата регистрации</label>
                        <input 
                            id="dateRegistration"
                            onChange={change}
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
                        <label htmlFor="timeRegistration" className="form-label">Время регистрации</label>
                        <input 
                            id="timeRegistration" 
                            onChange={change}
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
                    
                    <button 
                        type="submit" 
                        className="btn btn-primary mt-4"
                        style={
                            isPermitSubmitForm ?
                                null
                                :
                                {pointerEvents: 'none'}
                        }
                    >
                        {isPermitSubmitForm ? 'отправить' : 'проверка...'}
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-secondary mt-4" 
                        style={{marginLeft: '20px'}} 
                        onClick={() => navigate(-1)}
                    >
                        отмена
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditFormFlights;