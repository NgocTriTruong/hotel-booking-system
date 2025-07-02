import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { useTranslation } from "react-i18next";


function Navbar() {

    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const handleLogout = () => {
        const isLogout = window.confirm('' + t('nav.confirm')); // Confirm before logout
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
                <li><NavLink to="/home" activeClassName="active">{t('nav.home')}</NavLink></li>                    
                <li><NavLink to="/rooms" activeClassName="active">{t('nav.rooms')}</NavLink></li>                    
                <li><NavLink to="/find-booking" activeClassName="active">{t('nav.findBooking')}</NavLink></li>   

                {isUser && <li><NavLink to="/profile" activeClassName="active">{t('nav.profile')}</NavLink></li>}
                {isAdmin && <li><NavLink to="/admin" activeClassName="active">{t('nav.admin')}</NavLink></li>}

                {!isAuthenticated && <li><NavLink to="/login" activeClassName="active">{t('nav.login')}</NavLink></li>}   
                {!isAuthenticated && <li><NavLink to="/register" activeClassName="active">{t('nav.register')}</NavLink></li>} 

                {isAuthenticated && <li onClick={handleLogout} className="logoutPage">{t('nav.logout')}</li>}

                <li className="language-dropdown">
                    <div className={`language-option ${i18n.language === "en" ? "active" : ""}`} onClick={() => changeLanguage('en')}>
                        <img src="/assets/images/flag-uk.png" alt="English flag" width="25" height="18" />
                    </div>
                    <div className={`language-option ${i18n.language === "vi" ? "active" : ""}`} onClick={() => changeLanguage('vi')}>
                        <img src="/assets/images/flag-vn.png" alt="Vietnamese flag" width="25" height="18" />
                    </div>
                </li>
            </ul>

        </nav>
    )

}

export default Navbar;