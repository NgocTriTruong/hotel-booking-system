import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService'; // Assuming your service is in a file called ApiService.js
import { useTranslation } from "react-i18next";

const EditBookingPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { bookingCode } = useParams();
    const [bookingDetails, setBookingDetails] = useState(null); // State variable for booking details
    const [error, setError] = useState(null); // Track any errors
    const [success, setSuccessMessage] = useState(null); // Track any errors



    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await ApiService.getBookingByConfirmationCode(bookingCode);
                setBookingDetails(response.booking);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchBookingDetails();
    }, [bookingCode]);


    const acheiveBooking = async (bookingId) => {
        if (!window.confirm('' + t('admin.manageBookings.manageBooking.achieveConfirmation'))) {
            return; // Do nothing if the user cancels
        }

        try {
            const response = await ApiService.cancelBooking(bookingId);
            if (response.statusCode === 200) {
                setSuccessMessage("The boking was Successfully Acheived")
                
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/admin/manage-bookings');
                }, 3000);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className="find-booking-page">
            <h2>Booking Detail</h2>
            {error && <p className='error-message'>{error}</p>}
            {success && <p className='success-message'>{success}</p>}
            {bookingDetails && (
                <div className="booking-details">
                    <h3>{t('admin.manageBookings.manageBooking.title')}</h3>
                    <p>{t('admin.manageBookings.manageBooking.confirmationCode')}: {bookingDetails.bookingConfirmationCode}</p>
                    <p>{t('admin.manageBookings.manageBooking.checkInDate')}: {bookingDetails.checkInDate}</p>
                    <p>{t('admin.manageBookings.manageBooking.checkOutDate')}: {bookingDetails.checkOutDate}</p>
                    <p>{t('admin.manageBookings.manageBooking.numberOfAdults')}: {bookingDetails.numOfAdults}</p>
                    <p>{t('admin.manageBookings.manageBooking.numberOfChildren')}: {bookingDetails.numOfChildren}</p>
                    <p>{t('admin.manageBookings.manageBooking.guestEmail')}: {bookingDetails.guestEmail}</p>

                    <br />
                    <hr />
                    <br />
                    <h3>{t('admin.manageBookings.manageBooking.booker')}</h3>
                    <div>
                        <p>{t('admin.manageBookings.manageBooking.name')}: {bookingDetails.user.name}</p>
                        <p>{t('admin.manageBookings.manageBooking.email')}: {bookingDetails.user.email}</p>
                        <p>{t('admin.manageBookings.manageBooking.phone')}: {bookingDetails.user.phoneNumber}</p>
                    </div>

                    <br />
                    <hr />
                    <br />
                    <h3>{t('admin.manageBookings.manageBooking.roomDetails')}</h3>
                    <div>
                        <p>{t('admin.manageBookings.manageBooking.roomType')}: {bookingDetails.room.roomType}</p>
                        <p>{t('admin.manageBookings.manageBooking.roomPrice')}: ${bookingDetails.room.roomPrice}</p>
                        <p>{t('admin.manageBookings.manageBooking.roomDescription')}: {bookingDetails.room.roomDescription}</p>
                        <img src={bookingDetails.room.roomPhotoUrl} alt="" sizes="" srcSet="" />
                    </div>
                    <button
                        className="acheive-booking"
                        onClick={() => acheiveBooking(bookingDetails.id)}>{t('admin.manageBookings.manageBooking.achieveBooking')}
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditBookingPage;