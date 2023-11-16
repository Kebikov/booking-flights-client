import delayFnc from './delay.js';

const changeInput = (event) => {
        
    return () => {
        const id = event.target.id;
        const value = event.target.value;

        const inputObject = {
            'reys': 
        }

        console.log(id);
        console.log(value);
    }
};

const changeInputDeley = (event) => delayFnc(changeInput(event), 1000);

export default changeInputDeley;