import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from '../../service/ApiService';
import { useTranslation } from "react-i18next";

const AdminPage = () => {
    const [adminName, setAdminName] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchAdminName = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setAdminName(response.user.name);
            } catch (error) {
                console.error('Error fetching admin details:', error.message);
            }
        };

        fetchAdminName();
    }, []);

    return (
        <div className="admin-page">
            <h1 className="welcome-message">{t('admin.dashboard')}, {adminName}</h1>
            <div className="admin-actions">
                <button className="admin-button" onClick={() => navigate('/admin/manage-rooms')}>
                    {t('admin.manageRooms.title')}
                </button>
                <button className="admin-button" onClick={() => navigate('/admin/manage-bookings')}>
                    {t('admin.manageBookings.title')}
                </button>
            </div>
        </div>
    );
}

export default AdminPage;