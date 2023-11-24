import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import useStartApp from '../hooks/useStartApp';

import Flights from '../page/Flights/Flights';
import Booking from '../page/Booking/Booking';
import Header from '../components/Header/Header';
import Clock from '../components/Clock/Clock';
import Spiner from '../components/Spiner/Spiner';

const AddFlights = lazy(() => import('../page/AddFlights/AddFlights'));
const EditFlights = lazy(() => import('../page/EditFlights/EditFlights'));

const AddBooking = lazy(() => import('../page/AddBooking/AddBooking'));
const EditBooking = lazy(() => import('../page/EditBooking/EditBooking'));




const App = () =>  {

    useStartApp();

    return (
        <BrowserRouter>
            <div className="wrapper">
                <Header/>
                <Clock/>
                <main className="main">
                    <Suspense fallback={<Spiner/>}>
                        <Routes>
                            <Route path="/" element={<Flights/>}/>
                            <Route path="/booking" element={<Booking/>}/>
                            <Route path="/add-flights" element={<AddFlights/>}/>
                            <Route path="/edit-flights/:id" element={<EditFlights/>}/>
                            <Route path="/add-booking" element={<AddBooking/>}/>
                            <Route path="/edit-booking/:id" element={<EditBooking/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </BrowserRouter>
    );
};

export default App;
