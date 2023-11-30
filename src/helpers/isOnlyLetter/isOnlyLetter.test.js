import isOnlyLetter from './isOnlyLetter';

const deleteAddedClassesMock = jest.fn();
const addMock = jest.fn();



describe('isOnlyLetter', () => {

    test('Add valid', () => {

        const stateFormMock = {
            value: 'Только буквы',
            target: {
                classList: {
                    add: addMock
                }
            }
        };

        // Запускаем функцию с фиктивными данными
        isOnlyLetter(stateFormMock, deleteAddedClassesMock);

        // Проверяем, что функция deleteAddedClasses была вызвана
        expect(deleteAddedClassesMock).toHaveBeenCalled();

        // Проверяем, что функция add была вызвана с ожидаемым классом
        expect(stateFormMock.target.classList.add).toHaveBeenCalledWith('is-valid');

    });


    test('Add is-ivalid', () => {

        const stateFormMock = {
            value: 'Только буквы и 123',
            target: {
                classList: {
                    add: addMock
                }
            }
        };

        // Запускаем функцию с фиктивными данными
        isOnlyLetter(stateFormMock, deleteAddedClassesMock);

        // Проверяем, что функция deleteAddedClasses была вызвана
        expect(deleteAddedClassesMock).toHaveBeenCalled();

        // Проверяем, что функция add была вызвана с ожидаемым классом
        expect(stateFormMock.target.classList.add).toHaveBeenCalledWith('is-invalid');

    });

    afterEach(() => {
        jest.clearAllMocks(); // очишение mocks у глобального обьекта jest
    });


});