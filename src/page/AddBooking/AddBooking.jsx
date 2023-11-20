import '../../scss/public.scss';
import FormBooking from '../../components/FormBooking/FormBooking';

//-- AddBooking 
const AddBooking = () => {
    return(
        <>
            <div className="title-page">Добавление брони</div>
            <FormBooking/>
        </>
    );
};

export default AddBooking;