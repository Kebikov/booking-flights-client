import '../../scss/public.scss';
import { useParams } from 'react-router-dom';
import EditFormBooking from '../../components/EditFormBooking/EditFormBooking';

/**
 * PAGE > Страница с формой для редактирования брони в БД
 * @component
 * @example
 * <EditBooking/>
 */
//-- EditBooking 
const EditBooking = () => {
    const {id} = useParams();
    
    return(
        <>
            <div className="title-page">Редактирование рейса</div>
            <EditFormBooking id={ Number(id) } />
        </>
    );
};

export default EditBooking;