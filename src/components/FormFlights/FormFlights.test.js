import React from 'react';
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

        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBe(2);

        const inputsText = screen.getAllByRole('textbox');
        expect(inputsText.length).toBe(5);

        const inputsData = screen.getAllByTestId('date');
        expect(inputsData.length).toBe(4);

        expect( screen.getByLabelText('Рейс') ).toBeInTheDocument();
        expect( screen.getByLabelText(/Город/i) ).toBeInTheDocument();
        expect( screen.getByLabelText(/Дата рейса/i) ).toBeInTheDocument();
        expect( screen.getByLabelText(/Время рейса/i) ).toBeInTheDocument();
        expect( screen.getByLabelText(/Авиакомпания/i) ).toBeInTheDocument();
        expect( screen.getByLabelText(/Количество свободных мест/i) ).toBeInTheDocument();
        expect( screen.getByLabelText(/Дата регистрации/i) ).toBeInTheDocument();
        expect( screen.getByLabelText(/Время регистрации/i) ).toBeInTheDocument();
        expect( screen.getByLabelText(/Примечание/i) ).toBeInTheDocument();
    });
});

