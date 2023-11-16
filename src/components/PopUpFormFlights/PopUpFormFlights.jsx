import 'bootstrap/dist/css/bootstrap.css';
import './popUpFormFlights.scss';
import changeInputDeley from '../../helpers/changeInputDeley.js';
import { useState } from 'react';

const PopUpFormFlights = () => {
    const [stateForm, setStateForm] = useState({});

    const submitFormFlights = (event) => { 
        event.preventDefault();
        console.log(event.target);
    };

    s

    return(
        <div className="popup-form-flights">
            <div className="popup-form-flights__body">
                <form className="form-floating" onSubmit={submitFormFlights} >
                    {/*//* рейс */}
                    <div className="col-md-4 popup-form-flights__col">
                        <label htmlFor="route" className="form-label">Рейс</label>
                        <input 
                            id="route" 
                            onChange={changeInputDeley}
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
                        <label htmlFor="date" className="form-label">Дата рейса</label>
                        <input 
                            id="date" 
                            type="date" 
                            className="form-control"
                            // required
                        />
                        <div className="valid-feedback">
                            ok!
                        </div>
                        <div id="city" className="invalid-feedback">
                            Выберите другую дату или время.
                        </div>
                    </div>
                    {/*//* время */}
                    <div className="col-md-4 mt-2 popup-form-flights__col">
                        <label htmlFor="time" className="form-label">Время рейса</label>
                        <input 
                            id="time"
                            type="time" 
                            className="form-control"
                            // required
                        />
                        <div className="valid-feedback">
                            ok!
                        </div>
                        <div id="city" className="invalid-feedback">
                            Выберите другую дату или время.
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
                        <label htmlFor="dateReg" className="form-label">Дата регистрации</label>
                        <input 
                            id="dateReg" 
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
                    {/*//* время */}
                    <div className="col-md-4 mt-2 popup-form-flights__col">
                        <label htmlFor="timeReg" className="form-label">Время рейса</label>
                        <input 
                            id="timeReg" 
                            type="time" 
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
                    {/*//* Примечание */}
                    <div className="col-md-4 mt-2 popup-form-flights__col">
                        <label htmlFor="note" className="form-label">Примечание</label>
                        <input 
                            id="note" 
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