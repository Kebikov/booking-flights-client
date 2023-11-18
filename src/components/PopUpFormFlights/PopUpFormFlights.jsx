import 'bootstrap/dist/css/bootstrap.css';
import './popUpFormFlights.scss';

import { useNavigate } from 'react-router-dom';
import { httpSQL } from '../../service/http.service.js';

import delayFnc from '../../helpers/delay.js';
import useFormFlights from '../../hooks/useFormFlights.js';

/**
* COMPONENT > Форма для добавления рейса в БД
* @component
* @example
* Пример использования компонента <PopUpFormFlights/>:
* <PopUpFormFlights/>
*/
const PopUpFormFlights = () => {

    const {stateForm, changeInput, stateClassInputDate, stateClassDateRegistration} = useFormFlights();

    const navigate = useNavigate();

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

    const changeInputDelay = (event) => delayFnc(changeInput(event), 500);

    return(
        <div className="popup-form-flights">
            <div className="popup-form-flights__body">
                <form className="form-floating" onSubmit={submitFormFlights} >
                    {/*//* рейс */}
                    <div className="col-md-4 popup-form-flights__col">
                        <label htmlFor="route" className="form-label">Рейс</label>
                        <input 
                            id="route" 
                            onChange={changeInputDelay}
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
                        <div id="route" className="invalid-feedback">
                            Введите уникальное имя рейса.
                        </div>
                    </div>
                    {/*//* город */}
                    <div className="col-md-4 mt-2 popup-form-flights__col">
                        <label htmlFor="city" className="form-label">Город</label>
                        <input 
                            id="city" 
                            onChange={changeInputDelay}
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
                        <div id="city" className="invalid-feedback">
                            Error
                        </div>
                    </div>
                    {/*//* дата */}
                    <div className="col-md-4 mt-2 popup-form-flights__col">
                        <label htmlFor="dateRoute" className="form-label">Дата рейса</label>
                        <input 
                            id="dateRoute" 
                            onChange={changeInputDelay}
                            type="date" 
                            className={stateClassInputDate}
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
                            onChange={changeInputDelay} 
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
                        <div id="company" className="invalid-feedback">
                            Error
                        </div>
                    </div>
                    {/*//* Количество свободных мест */}
                    <div className="col-md-4 mt-2 popup-form-flights__col">
                        <label htmlFor="freePlace" className="form-label">Количество свободных мест</label>
                        <input 
                            id="freePlace"
                            onChange={changeInputDelay} 
                            type="text"
                            className="form-control"
                            placeholder="max 99 мест"
                            required
                        />
                        <div className="valid-feedback">
                            ok!
                        </div>
                        <div id="freePlace" className="invalid-feedback">
                            max 99 мест в самолете
                        </div>
                    </div>
                    {/*//* дата регистрации*/}
                    <div className="col-md-4 mt-2 popup-form-flights__col">
                        <label htmlFor="dateRegistration" className="form-label">Дата регистрации</label>
                        <input 
                            id="dateRegistration" 
                            onChange={changeInputDelay}
                            type="date" 
                            className={stateClassDateRegistration}
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
                            maxLength="64"
                            placeholder="max 64 символа"
                            autoComplete="off"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4">отправить</button>
                    <button 
                        type="submit" 
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

export default PopUpFormFlights;