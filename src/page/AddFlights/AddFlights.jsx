import PopUpFormFlights from '../../components/PopUpFormFlights/PopUpFormFlights';
import '../../scss/public.scss';

/**
* PAGE > Страница с формой для добавления рейса в БД
* @component
* @example
* <AddFlights/>
*/
//-- AddFlights 
const AddFlights = () => {
    return(
        <>
            <div className="title-page">Добавление рейса</div>
            <PopUpFormFlights/>
        </>
    );
};

export default AddFlights;