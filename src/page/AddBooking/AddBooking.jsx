import '../../scss/public.scss';
import 'bootstrap/dist/css/bootstrap.css';
import FormBooking from '../../components/FormBooking/FormBooking';

//-- AddBooking 
const AddBooking = () => {
    return(
        <>
            <div className="title-page mt-2">Добавление брони</div>
            <FormBooking/>
        </>
    );
};

export default AddBooking;