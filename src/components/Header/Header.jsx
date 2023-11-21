import './header.scss';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import useGetAllFlights from '../../hooks/useGetAllFlights';
import useGetAllBooking from '../../hooks/useGetAllBooking';

/**
 * Component > menu in header
 * - навигация по страницам App
 * @component
 */
const Header = () => {

    const {updateAllFlights} = useGetAllFlights();
    const {updateAllBooking} = useGetAllBooking();

    useEffect(() => {
        // получение в глобальное состояние всех рейсов 
        updateAllFlights();
        // получение в глобальное состояние всей брони
        updateAllBooking();
    },[]); // eslint-disable-line 

    return(
        <nav className="navbar-menu">
            <div className="navbar-menu__body">
                <div className="navbar-menu__link _link-blue">
                    OUR MENU
                </div>
                <div className="navbar-menu__link">
                    <NavLink 
                        to={'/'} 
                        className="navbar-menu__link" 
                        end 
                        style={(({isActive}) => ({textDecoration: isActive ? 'underline' : 'none'}))}
                    >
                        Рейсы
                    </NavLink>
                </div>
                <div className="navbar-menu__link">
                    <NavLink 
                        to={'/booking'} 
                        className="navbar-menu__link" 
                        end 
                        style={(({isActive}) => ({textDecoration: isActive ? 'underline' : 'none'}))}
                    >
                        Бронь
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Header;