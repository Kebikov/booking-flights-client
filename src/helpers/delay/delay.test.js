import delayFnc from './delay';

// Mock функции, которая будет выполнена через заданное время
const mockFunction = jest.fn();

describe('delayFnc', () => {

    // Переопределение функции setTimeout, чтобы она сразу вызывала переданную функцию
    jest.useFakeTimers();

    test('Valid', () => {
        // Запускаем функцию с задержкой в 1000 мс
        delayFnc(mockFunction, 1000);

        // Проверяем, что функция еще не была вызвана
        expect(mockFunction).not.toHaveBeenCalled();
        
        // "Продвигаем" таймер на 1000 мс
        jest.advanceTimersByTime(1000);

        // Проверяем, что функция была вызвана после задержки
        expect(mockFunction).toHaveBeenCalled();

        // Восстанавливаем оригинальное поведение setTimeout после теста
        jest.useRealTimers();
    });
});