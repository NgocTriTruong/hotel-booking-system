import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { t, i18n } = useTranslation();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                // Fetch user bookings using the fetched user ID
                const userPlusBookings = await ApiService.getUserBookings(response.user.id);
                setUser(userPlusBookings.user)

            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        ApiService.logout();
        navigate('/home');
    };

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    return (
        <div className="profile-page">
            {user && <h2>{t('profile.welcome')}, {user.name}</h2>}
            <div className="profile-actions">
                <button className="edit-profile-button" onClick={handleEditProfile}>{t('profile.editProfile')}</button>
                <button className="logout-button" onClick={handleLogout}>{t('profile.logout')}</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {user && (
                <div className="profile-details">
                    <h3>{t('profile.myProfile')}</h3>
                    <p><strong>{t('profile.email')}:</strong> {user.email}</p>
                    <p><strong>{t('profile.phone')}:</strong> {user.phoneNumber}</p>
                </div>
            )}
            <div className="bookings-section">
                <h3>{t('profile.bookingHistory')}</h3>
                <div className="booking-list">
                    {user && user.bookings.length > 0 ? (
                        user.bookings.map((booking) => (
                            <div key={booking.id} className="booking-item">
                                <p><strong>{t('profile.bookingCode')}:</strong> {booking.bookingConfirmationCode}</p>
                                <p><strong>{t('profile.checkInDate')}:</strong> {booking.checkInDate}</p>
                                <p><strong>{t('profile.checkOutDate')}:</strong> {booking.checkOutDate}</p>
                                <p><strong>{t('profile.totalGuests')}:</strong> {booking.totalNumOfGuest}</p>
                                <p><strong>{t('profile.roomType')}:</strong> {booking.room.roomType}</p>
                                <img src={booking.room.roomPhotoUrl} alt="Room" className="room-photo" />
                            </div>
                        ))
                    ) : (
                        <p>{t('profile.noBookingsFound')}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;