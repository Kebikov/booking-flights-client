import 'bootstrap/dist/css/bootstrap.css';
import '../FormFlights/formFlights.scss';
import { useNavigate } from 'react-router-dom';
import { httpSQL } from '../../service/http.service.js';
import delayFnc from '../../helpers/delay.js';
import useFormBooking from '../../hooks/useFormBooking.js';
import * as Types from '../../types.js'; // eslint-disable-line

/** COMPONENT > Форма для добавления рейса в БД
* @component
* @example
* <FormBooking/> */
//= FormBooking 
const FormBooking = () => {

    const navigate = useNavigate();

    const {stateForm, setStateForm, changeInput} = useFormBooking();
    console.log('',stateForm);
    return(
        <div className="popup-form-flights">
            <div className="popup-form-flights__body">
                <form className="form-floating" onSubmit={() => {}} >
                    {/*//* рейс */}
                    <div className="col-md-4 popup-form-flights__col">
                        <label htmlFor="route" className="form-label">Рейс</label>
                        <input 
                            id="route" 
                            value={stateForm.route}
                            onChange={changeInput}
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
                    {/*//* Фамилия */}
                    <div className="col-md-4 mt-2 popup-form-flights__col">
                        <label htmlFor="surname" className="form-label">Фамилия</label>
                        <input 
                            id="surname" 
                            onChange="form-control"
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
                        <div id="surname" className="invalid-feedback">
                            Error
                        </div>
                    </div>
                    {/*//* имя */}
                    <div className="col-md-4 mt-2 popup-form-flights__col">
                        <label htmlFor="name" className="form-label">Имя</label>
                        <input 
                            id="name" 
                            onChange={changeInput}
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
                        <div id="name" className="invalid-feedback">
                            Выберите другую дату или время рейса.
                        </div>
                    </div>
                    {/*//* Отчество */}
                    <div className="col-md-4 mt-2 popup-form-flights__col">
                        <label htmlFor="middleName" className="form-label">Отчество</label>
                        <input 
                            id="middleName"
                            onChange={changeInput} 
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
                        <div id="middleName" className="invalid-feedback">
                            Error
                        </div>
                    </div>
                    {/*//* Примечание */}
                    <div className="col-md-4 mt-2 popup-form-flights__col">
                        <label htmlFor="note" className="form-label">Примечание</label>
                        <input 
                            id="note"
                            onChange={changeInput}
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

export default FormBooking;