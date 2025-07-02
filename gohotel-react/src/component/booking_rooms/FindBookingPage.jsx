import React, { useState } from 'react';
import ApiService from '../../service/ApiService'; // Assuming your service is in a file called ApiService.js
import { useTranslation } from "react-i18next";

const FindBookingPage = () => {
    const [confirmationCode, setConfirmationCode] = useState(''); // State variable for confirmation code
    const [bookingDetails, setBookingDetails] = useState(null); // State variable for booking details
    const [error, setError] = useState(null); // Track any errors

    const { t, i18n } = useTranslation();


    const handleSearch = async () => {
        if (!confirmationCode.trim()) {
            setError("Please Enter a booking confirmation code");
            setTimeout(() => setError(''), 5000);
            return;
        }
        try {
            // Call API to get booking details
            const response = await ApiService.getBookingByConfirmationCode(confirmationCode);
            setBookingDetails(response.booking);
            setError(null); // Clear error if successful
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className="find-booking-page">
            <h2>{t("findBooking.title")}</h2>
            <div className="search-container">
                <input
                    required
                    type="text"
                    placeholder={t("findBooking.enterCode")}
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                />
                <button onClick={handleSearch}>{t("findBooking.find")}</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {bookingDetails && (
                <div className="booking-details">
                    <h3>{t("findBooking.bookingDetails.bookingDetails")}</h3>
                    <p>{t("findBooking.bookingDetails.bookingCode")}: {bookingDetails.bookingConfirmationCode}</p>
                    <p>{t("findBooking.bookingDetails.checkInDate")}: {bookingDetails.checkInDate}</p>
                    <p>{t("findBooking.bookingDetails.checkOutDate")}: {bookingDetails.checkOutDate}</p>
                    <p>{t("findBooking.bookingDetails.numberOfAdults")}: {bookingDetails.numOfAdults}</p>
                    <p>{t("findBooking.bookingDetails.numberOfChildren")}: {bookingDetails.numOfChildren}</p>

                    <br />
                    <hr />
                    <br />
                    <h3>{t("findBooking.bookingDetails.userDetails")}</h3>
                    <div>
                        <p>{t("findBooking.bookingDetails.name")}: {bookingDetails.user.name}</p>
                        <p>{t("findBooking.bookingDetails.email")}: {bookingDetails.user.email}</p>
                        <p>{t("findBooking.bookingDetails.phone")}: {bookingDetails.user.phoneNumber}</p>
                    </div>

                    <br />
                    <hr />
                    <br />
                    <h3>{t("findBooking.bookingDetails.roomDetails")}</h3>
                    <div>
                        <p>{t("findBooking.bookingDetails.roomType")}: {bookingDetails.room.roomType}</p>
                        <img src={bookingDetails.room.roomPhotoUrl} alt="" sizes="" srcSet="" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FindBookingPage;