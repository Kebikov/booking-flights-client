import delayFnc from './delay.js';
import { httpSQL } from '../service/http.service.js';


const changeInput = (event) => {
        
    return () => {
        const target = event.target;
        const id = target.id;
        const value = target.value;

        console.log(event.target);
        console.log(id);
        console.log(value);

        const inputObjectPost = {
            field: id,
            value: value
        };

        const inputObject = {
            [id]: value
        }; 

        console.log(inputObject);

        if(value) {
            httpSQL
                .post('/check-form-flights', inputObjectPost)
                .then(res => {
                    console.log(res.data);
                    const msg = res.data?.msg;
                    if(msg === undefined || msg === 'route not found') return;
                    if(msg) {
                        target.classList.add('is-valid');
                    } else {
                        target.classList.add('is-invalid');
                    }
                })
                .catch(error => console.log(error));
        } else {
            target.classList.remove('is-valid');
            target.classList.remove('is-invalid');
        } 

        
    };
};

const changeInputDeley = (event) => delayFnc(changeInput(event), 1000);

export default changeInputDeley;