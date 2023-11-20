import '../../scss/public.scss';
import FormFlights from '../../components/FormFlights/FormFlights';


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
            <FormFlights/>
        </>
    );
};

export default AddFlights;