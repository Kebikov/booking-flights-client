/** Function изминения состояния.
 * @param {Event} event - Обьект события
 * @param {Function} setStateForm - Function изминения state формы
 * @param {Function} setIsPermitSubmitForm - Function изминения state, доступности отправки формы.
 * @return {void} - Изминяет state у формы.
 */
function changeInput(event, setStateForm, setIsPermitSubmitForm) {
    const target = event.target;
    const id = target.id;
    const value = target.value;
    setStateForm(state => ( {...state, [id]: value, id, target, value} ));
    setIsPermitSubmitForm(false);
};

export default changeInput;