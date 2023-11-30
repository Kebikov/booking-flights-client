import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Для использования дополнительных матчеров Jest
import AddFlights from './AddFlights';


describe('Компонент AddFlights', () => {
    test('рендер компонентов', () => {
        render(<AddFlights/>);
        const titlePage = screen.getByText(/Добавление рейса/i);
        expect(titlePage).toBeInTheDocument();
    });
});