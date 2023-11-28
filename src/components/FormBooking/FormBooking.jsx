import 'bootstrap/dist/css/bootstrap.css';
import '../FormFlights/formFlights.scss';
import { useNavigate } from 'react-router-dom';
import { httpSQL } from '../../service/http.service.js';
import useFormBooking from '../../hooks/useFormBooking.js';
import '../../types.js';
import changeInput from '../../helpers/changeInput.js';
import useGetAllFlights from '../../hooks/useGetAllFlights.js';

/** 
 * COMPONENT > Форма для добавления рейса в БД
 * @component
 * @example
 * <FormBooking/> 
 */
//= FormBooking 
const FormBooking = () => {

    const navigate = useNavigate();

    const {updateAllFlights} = useGetAllFlights();
    /** 
     * Hook useFormBooking return.
     * @type {UseFormBooking}
     */
    const {
        stateForm, 
        setStateForm,
        isPermitSubmitForm,
        setIsPermitSubmitForm
    } = useFormBooking();
    
    //* отправка формы
    const submitFormBooking = (event) => { 
        event.preventDefault();
        const form = event.target;
        const isInvalidElements = form.querySelectorAll('.is-invalid');

        if(isInvalidElements?.length === 0) {
            const bodyForm = {
                route: stateForm.route.toUpperCase(),
                surname: stateForm.surname,
                name: stateForm.name, 
                middleName: stateForm.middleName,
                note: stateForm?.note ?? '' 
            };

            httpSQL
                .post('/form-booking', bodyForm)
                .then((res) => {
                    if(res.data?.msg === 'FREE_PLACE_ZERO') {
                        alert('Нет свободных мест на самолете.');
                        return;
                    }
                    updateAllFlights();
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
                <form className="form-floating popup-form-flights__form" onSubmit={submitFormBooking} >
                    {/*//* рейс */}
                    <div className="col-md-4 popup-form-flights__input">
                        <label htmlFor="route" className="form-label">Рейс</label>
                        <input 
                            id="route" 
                            value={stateForm.route}
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
                        <div id="route" className="invalid-feedback">
                            Нет такого рейса.
                        </div>
                    </div>
                    {/*//* Фамилия */}
                    <div className="col-md-4 mt-2 popup-form-flights__input">
                        <label htmlFor="surname" className="form-label">Фамилия</label>
                        <input 
                            id="surname" 
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
                        <div id="surname" className="invalid-feedback">
                            В фамилии далжны быть только буквы.
                        </div>
                    </div>
                    {/*//* имя */}
                    <div className="col-md-4 mt-2 popup-form-flights__input">
                        <label htmlFor="name" className="form-label">Имя</label>
                        <input 
                            id="name" 
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
                        <div id="name" className="invalid-feedback">
                            В имени далжны быть только буквы.
                        </div>
                    </div>
                    {/*//* Отчество */}
                    <div className="col-md-4 mt-2 popup-form-flights__input">
                        <label htmlFor="middleName" className="form-label">Отчество</label>
                        <input 
                            id="middleName"
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
                        <div id="middleName" className="invalid-feedback">
                            В отчестве далжны быть только буквы.
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

export default FormBooking;