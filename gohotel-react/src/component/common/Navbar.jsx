import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { useTranslation } from "react-i18next";

function Navbar() {

    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();
    const { i18n } = useTranslation();

    const handleLogout = () => {
        const isLogout = window.confirm('Are you sure you want to logout this user?');
        if (isLogout) {
            ApiService.logout();
            navigate("/home");
        }
    }

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng); // Change language all website
    };


    return (
        <nav className="navbar">

            <div className="navbar-brand">
                <NavLink to="/home">GoHotel</NavLink>
            </div>
            <ul className="navbar-ul">
                <li><NavLink to="/home" activeClassName="active">Home</NavLink></li>                    
                <li><NavLink to="/rooms" activeClassName="active">Rooms</NavLink></li>                    
                <li><NavLink to="/find-booking" activeClassName="active">Find My Booking</NavLink></li>   

                {isUser && <li><NavLink to="/profile" activeClassName="active">Profile</NavLink></li>}
                {isAdmin && <li><NavLink to="/admin" activeClassName="active">Admin</NavLink></li>}

                {!isAuthenticated && <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>}   
                {!isAuthenticated && <li><NavLink to="/register" activeClassName="active">Register</NavLink></li>} 

                {isAuthenticated && <li onClick={handleLogout} className="logoutPage">Logout</li>}

                <li>
                    <button onClick={() => changeLanguage('en')}>English</button>
                    <button onClick={() => changeLanguage('vi')}>Tiếng Việt</button>
                </li>
            </ul>

        </nav>
    )

}

export default Navbar;