import 'bootstrap/dist/css/bootstrap.css';
import '../FormFlights/formFlights.scss';
import '../../types.js';
import { useNavigate } from 'react-router-dom';
import useFormBooking from '../../hooks/useFormBooking.js';
import useGetAllBooking from '../../hooks/useGetAllBooking.js';
import changeInput from '../../helpers/changeInput.js';
import { useEffect } from 'react';
import convertObjBookingDataToStateForm from '../../helpers/convertObjBookingDataToStateForm.js';
import { httpSQL } from '../../service/http.service.js';


/**
 * @typedef {Object} Propse
 * @property {number} id - Id рейса.
 */

/** 
 * COMPONENT > Форма для редактирования брони в БД.
 * @component
 * @example
 * <EditFormBooking id={...} />
 * @param {Propse} 
 * @param {number} id - Id рейса.
 */
//= EditFormBooking 
const EditFormBooking = ({id}) => {
    const navigate = useNavigate();

    /** 
     * Hook useFormBooking return.
     * @type {UseFormBooking}
     */
    const {stateForm, setStateForm, isPermitSubmitForm, setIsPermitSubmitForm} = useFormBooking();

    /** 
     * Hook useGetAllBooking return:
     * @typedef {Object} UseGetAllBooking
     * @property {BookingData[]} curentDataBooking - Массив со всеми бронями.
     * @property {Function} updateAllBooking - Функция обновления данных о брони.
     */
    /**
     *  @type {UseGetAllBooking}
     */
    const {updateAllBooking} = useGetAllBooking();

    const submitFormBooking = (event) => {
        event.preventDefault();
        const form = event.target;
        const isInvalidElements = form.querySelectorAll('.is-invalid');

        if(isInvalidElements?.length === 0) {
            /**
             * @type {TotalAllPage}
             */
            const body = {
                surname: stateForm.surname,
                name: stateForm.name,
                middleName: stateForm.middleName
            };
            body.id = id;
            httpSQL
                .patch('/patch-booking', body)
                .then(() => {
                    updateAllBooking();
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

    useEffect(() => {

        httpSQL
            .get(`/get-booking/${id}`)
            .then(res => {
                const state = convertObjBookingDataToStateForm(res.data);
                setStateForm(state);
            })
            .catch(err => console.error(err));

    },[]); // eslint-disable-line

    return(
        <div className="popup-form-flights">
            <div className="popup-form-flights__body">
                <form className="form-floating popup-form-flights__form" onSubmit={submitFormBooking} >
                    {/*//* Фамилия */}
                    <div className="col-md-4 mt-2 popup-form-flights__input">
                        <label htmlFor="surname" className="form-label">Фамилия</label>
                        <input 
                            id="surname" 
                            onChange={change}
                            value={stateForm.surname}
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
                            value={stateForm.name}
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
                            value={stateForm.middleName}
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
                            type="button" 
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

export default EditFormBooking;




