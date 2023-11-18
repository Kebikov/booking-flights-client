import '../../scss/public.scss';
import PopUpEditFormFlights from '../../components/PopUpEditFormFlights/PopUpEditFormFlights';
import { useParams } from 'react-router-dom';

/**
* PAGE > Страница с формой для редактирования рейса в БД
* @component
* @example
* <EditFlights/>
*/
//-- EditFlights 
const EditFlights = () => {
    const {id} = useParams();

    return(
        <>
            <div className="title-page">Редактирование рейса</div>
            <PopUpEditFormFlights id={ Number(id) } />
        </>
    );
};

export default EditFlights;