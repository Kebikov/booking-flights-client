import './header.scss';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import useGetAllFlights from '../../hooks/useGetAllFlights';
import useGetAllBooking from '../../hooks/useGetAllBooking';
import { useSelector } from 'react-redux';

/**
 * Component > menu in header
 * - навигация по страницам App
 * @component
 */
const Header = () => {

    /**
     * @type {number} totalLineInPage 
     * - Установленое количество отображаемых записей.
     */
    const totalLineInPage = useSelector(state => state.sliceForm.totalLineInPage);
    /**
     * @type {number} currentPage
     * - Номер текушей просматриваемой страницы.
     */
    const currentPage = useSelector(state => state.sliceForm.currentPage); 

    const {updateAllFlights} = useGetAllFlights();
    const {updateAllBooking} = useGetAllBooking();

    useEffect(() => {
        // получение в глобальное состояние всех рейсов 
        updateAllFlights();
        // получение в глобальное состояние всей брони
        updateAllBooking();
    },[totalLineInPage, currentPage]); // eslint-disable-line 

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