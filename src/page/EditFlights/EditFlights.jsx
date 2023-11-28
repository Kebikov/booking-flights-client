import '../../scss/public.scss';
import 'bootstrap/dist/css/bootstrap.css';
import EditFormFlights from '../../components/EditFormFlights/EditFormFlights';
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
            <div className="title-page mt-2">Редактирование рейса</div>
            <EditFormFlights id={ Number(id) } />
        </>
    );
};

export default EditFlights;