import '../../scss/public.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { useParams } from 'react-router-dom';
import EditFormBooking from '../../components/EditFormBooking/EditFormBooking';

/**
 * PAGE > Страница с формой для редактирования брони в БД.
 * @component
 * @example
 * <EditBooking/>
 */
//-- EditBooking 
const EditBooking = () => {
    const {id} = useParams();
    
    return(
        <>
            <div className="title-page mt-2">Редактирование рейса</div>
            <EditFormBooking id={ Number(id) } />
        </>
    );
};

export default EditBooking;