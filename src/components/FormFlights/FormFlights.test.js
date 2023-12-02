import { render, screen } from '@testing-library/react';
import FormFlights from './FormFlights';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Компонент AddFlights', () => {
    it('рендер компонентов', () => {
        render(
            <BrowserRouter>
                <FormFlights/>
            </BrowserRouter>
        );

        expect( screen.getByText(/Город/i) ).toBeInTheDocument();
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBe(2);
    });
});

