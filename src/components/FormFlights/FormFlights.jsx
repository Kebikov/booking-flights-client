import 'bootstrap/dist/css/bootstrap.css';
import './formFlights.scss';
import { useNavigate } from 'react-router-dom';
import { httpSQL } from '../../service/http.service.js';
import useFormFlights from '../../hooks/useFormFlights.js';
import '../../types.js';
import changeInput from '../../helpers/changeInput.js';

/** COMPONENT > Форма для добавления рейса в БД.
* @component
* @example
* <FormFlights/> */
//= FormFlights 
const FormFlights = () => {

    /** 
     * Hook useFormFlights return. 
     * @type {UseFormFlights} 
     */ 
    const {
        stateForm, 
        setStateForm, 
        stateClassInputDate, 
        stateClassDateRegistration,
        isPermitSubmitForm,
        setIsPermitSubmitForm
    } = useFormFlights();

    const navigate = useNavigate();

    const submitFormFlights = (event) => { 
        event.preventDefault();
        const form = event.target;
        const isInvalidElements = form.querySelectorAll('.is-invalid');

        if(isInvalidElements?.length === 0) {
            const bodyForm = {
                route: stateForm.route.toUpperCase(),
                city: stateForm.city,
                date: `${stateForm.dateRoute}T${stateForm.timeRoute}:00`, 
                company: stateForm.company,
                checkIn: `${stateForm.dateRegistration}T${stateForm.timeRegistration}:00`,
                freePlace: Number (stateForm.freePlace),
                note: stateForm?.note ?? '' 
            };

            httpSQL
                .post('/form-flights', bodyForm)
                .then(() => {
                    form.reset();
                    navigate(-1);
                })
                .catch(error => console.error(error));
        }
    };

    /** Function отбрабатываюшая измининия состояния полей.
    * @property {Event} event - Событие, которое вызвало изменение.
    */
    const change = (event) => changeInput(event, setStateForm, setIsPermitSubmitForm);

    return(
        <div className="popup-form-flights">
            <div className="popup-form-flights__body">
                <form className="form-floating popup-form-flights__form" onSubmit={submitFormFlights} >
                    {/*//* рейс */}
                    <div className="col-md-4 popup-form-flights__input">
                        <label htmlFor="route" className="form-label">Рейс</label>
                        <input 
                            id="route"
                            onChange={change}
                            type="text" 
                            className="form-control" 
                            maxLength="16" 
                            placeholder="max 16 символов"
                            autoComplete="off"
                            required
                        />
                        <div className="valid-feedback">
                            ok!
                        </div>
                        <div className="invalid-feedback">
                            Введите уникальное имя рейса.
                        </div>
                    </div>
                    {/*//* город */}
                    <div className="col-md-4 mt-2 popup-form-flights__input">
                        <label htmlFor="city" className="form-label">Город</label>
                        <input 
                            id="city" 
                            onChange={change}
                            type="text" 
                            className="form-control"
                            maxLength="32"
                            placeholder="max 32 символа"
                            autoComplete="off"
                            required
                        />
                        <div className="valid-feedback">
                            ok!
                        </div>
                        <div className="invalid-feedback">
                            Разрешены только буквы.
                        </div>
                    </div>
                    {/*//* дата */}
                    <div className="col-md-4 mt-2 popup-form-flights__input">
                        <label htmlFor="dateRoute" className="form-label">Дата рейса</label>
                        <input 
                            id="dateRoute" 
                            data-testid = "date"
                            onChange={change}
                            type="date" 
                            className={stateClassInputDate}
                            autoComplete="off"
                            required
                        />
                        <div className="valid-feedback">
                            ok!
                        </div>
                        <div className="invalid-feedback">
                            Выберите другую дату или время рейса.
                        </div>
                    </div>
                    {/*//* время */}
                    <div className="col-md-4 mt-2 popup-form-flights__input">
                        <label htmlFor="timeRoute" className="form-label">Время рейса</label>
                        <input 
                            id="timeRoute"
                            data-testid = "date"
                            onChange={change}
                            type="time" 
                            className={stateClassInputDate}
                            required
                        />
                        <div className="valid-feedback">
                            ok!
                        </div>
                        <div className="invalid-feedback">
                            Выберите другую дату или время рейса.
                        </div>
                    </div>
                    {/*//* Авиакомпания */}
                    <div className="col-md-4 mt-2 popup-form-flights__input">
                        <label htmlFor="company" className="form-label">Авиакомпания</label>
                        <input 
                            id="company"
                            onChange={change} 
                            type="text"
                            className="form-control"
                            maxLength="32"
                            placeholder="max 32 символа"
                            autoComplete="off"
                            required
                        />
                        <div className="valid-feedback">
                            ok!
                        </div>
                        <div className="invalid-feedback">
                            Разрешены только буквы.
                        </div>
                    </div>
                    {/*//* Количество свободных мест */}
                    <div className="col-md-4 mt-2 popup-form-flights__input">
                        <label htmlFor="freePlace" className="form-label">Количество свободных мест</label>
                        <input 
                            id="freePlace"
                            onChange={change} 
                            type="text"
                            className="form-control"
                            placeholder="max 99 мест"
                            required
                        />
                        <div className="valid-feedback">
                            ok!
                        </div>
                        <div className="invalid-feedback">
                            Max 99 мест в самолете, разрешены только цыфры.
                        </div>
                    </div>
                    {/*//* дата регистрации*/}
                    <div className="col-md-4 mt-2 popup-form-flights__input">
                        <label htmlFor="dateRegistration" className="form-label">Дата регистрации</label>
                        <input 
                            id="dateRegistration" 
                            data-testid = "date"
                            onChange={change}
                            type="date" 
                            className={stateClassDateRegistration}
                            required
                        />
                        <div className="valid-feedback">
                            ok!
                        </div>
                        <div className="invalid-feedback">
                            Регистрация минимум за 30 минут до рейса.
                        </div>
                    </div>
                    {/*//* время регистрации*/}
                    <div className="col-md-4 mt-2 popup-form-flights__input">
                        <label htmlFor="timeRegistration" className="form-label">Время регистрации</label>
                        <input 
                            id="timeRegistration" 
                            data-testid = "date"
                            onChange={change}
                            type="time" 
                            className={stateClassDateRegistration}
                            required
                        />
                        <div className="valid-feedback">
                            ok!
                        </div>
                        <div className="invalid-feedback">
                            Регистрация минимум за 30 минут до рейса.
                        </div>
                    </div>
                    {/*//* Примечание */}
                    <div className="col-md-4 mt-2 popup-form-flights__input">
                        <label htmlFor="note" className="form-label">Примечание</label>
                        <input 
                            id="note"
                            onChange={change}
                            type="text" 
                            className="form-control"
                            maxLength="64"
                            placeholder="max 64 символа"
                            autoComplete="off"
                        />
                    </div>
                    <div className="popup-form-flights__buttons">
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
                            type="submit" 
                            className="btn btn-secondary mt-4" 
                            style={{marginLeft: '20px'}} 
                            onClick={() => navigate(-1)}
                        >
                            отмена
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormFlights;