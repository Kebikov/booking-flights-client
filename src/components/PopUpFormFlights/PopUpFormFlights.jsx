import 'bootstrap/dist/css/bootstrap.css';
import './popUpFormFlights.scss';

import delayFnc from '../../helpers/delay.js';
import useFormFlights from '../../hooks/useFormFlights.js';

const PopUpFormFlights = () => {

    const {changeInput, stateClassInputDate} = useFormFlights();

    const submitFormFlights = (event) => { 
        event.preventDefault();
    };

    const changeInputDelay = (event) => delayFnc(changeInput(event), 1000);

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
                            // required
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
                            // required
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
                            // required
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
                            // required
                        />
                        <div className="valid-feedback">
                            ok!
                        </div>
                        <div id="timeRoute" className="invalid-feedback">
                            Выберите другую дату или время рейса.
                        </div>
                    </div>
                    {/*//* Количество свободных мест */}
                    <div className="col-md-4 mt-2 popup-form-flights__col">
                        <label htmlFor="sit" className="form-label">Количество свободных мест</label>
                        <input 
                            id="sit" 
                            type="number"
                            min={0}
                            max={99}
                            className="form-control"
                            placeholder="max 99 мест"
                            // required
                        />
                        <div className="valid-feedback">
                            ok!
                        </div>
                        <div id="city" className="invalid-feedback">
                            max 99 мест в самолете
                        </div>
                    </div>
                    {/*//* дата регистрации*/}
                    <div className="col-md-4 mt-2 popup-form-flights__col">
                        <label htmlFor="dateRegistration" className="form-label">Дата регистрации</label>
                        <input 
                            id="dateRegistration" 
                            type="date" 
                            className="form-control"
                            // required
                        />
                        <div className="valid-feedback">
                            ok!
                        </div>
                        <div id="city" className="invalid-feedback">
                            Регистрация минимум за 30 минут до рейса.
                        </div>
                    </div>
                    {/*//* время регистрации*/}
                    <div className="col-md-4 mt-2 popup-form-flights__col">
                        <label htmlFor="timeRegistration" className="form-label">Время рейса</label>
                        <input 
                            id="timeRegistration" 
                            type="time" 
                            className="form-control"
                            // required
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
                </form>
            </div>
        </div>
    );
};

// is-invalid is-valid
export default PopUpFormFlights;