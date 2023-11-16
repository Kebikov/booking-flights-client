import { BrowserRouter, Routes, Route } from 'react-router-dom';

import FlightsPage from '../page/Flights/FlightsPage';
import BookingPage from '../page/Booking/BookingPage';
import Header from '../components/Header/Header';
import Clock from '../components/Clock/Clock';

const App = () =>  {

    return (
        <BrowserRouter>
            <div className="wrapper">
                <Header/>
                <Clock/>
                <main className="main">
                    <Routes>
                        <Route path="/" element={<FlightsPage/>}/>
                        <Route path="/booking" element={<BookingPage/>}/>
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
};

export default App;
