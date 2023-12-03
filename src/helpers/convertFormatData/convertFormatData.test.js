import convertFormatData from './convertFormatData.js';

describe('convertFormatData', () => {


    test('Valid format without T', () => {
        const result = convertFormatData('2023-12-10 21:00:00.000Z');
        expect(result).toBe('10.12.2023 21:00');
    });

    test('Valid format with T', () => {
        const result = convertFormatData('2023-12-10T21:00:00.000Z');
        expect(result).toBe('10.12.2023 21:00');
    });

    test('Ivalid rnd string', () => {
        const result = convertFormatData('abc');
        expect(result).toBe(null);
    });

    test('Ivalid only date', () => {
        const result = convertFormatData('2023-12-10');
        expect(result).toBe(null);
    });

});