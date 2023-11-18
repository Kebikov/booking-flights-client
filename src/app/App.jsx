import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import FlightsPage from '../page/Flights/FlightsPage';
import BookingPage from '../page/Booking/BookingPage';
import Header from '../components/Header/Header';
import Clock from '../components/Clock/Clock';
import Spiner from '../components/Spiner/Spiner';

const AddFlights = lazy(() => import('../page/AddFlights/AddFlights'));


const App = () =>  {

    return (
        <BrowserRouter>
            <div className="wrapper">
                <Header/>
                <Clock/>
                <main className="main">
                    <Suspense fallback={<Spiner/>}>
                        <Routes>
                            <Route path="/" element={<FlightsPage/>}/>
                            <Route path="/booking" element={<BookingPage/>}/>
                            <Route path="/add-Flights" element={<AddFlights/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </BrowserRouter>
    );
};

export default App;
