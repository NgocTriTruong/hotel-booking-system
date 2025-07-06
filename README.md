# 🏨 GoHotel - Hotel Booking Website

**GoHotel** is a basic **hotel booking website** that allows users to search for available rooms, book rooms by selecting check-in and check-out dates, and view their booking history. The system supports **bilingual content (English - Vietnamese)** and includes an admin panel for managing rooms and bookings.

🌐 **Live demo:** [https://gohotel.online/](https://gohotel.online/)

⚠️ **Note:** The site uses free hosting (Render, Netlify, Aiven), so the frontend may load a bit slowly.

## ✨ Main Features

### 👤 User
- View all available hotel rooms.
- Filter rooms by type (e.g., Single, Double, VIP).
- Search rooms by check-in and check-out date.
- Book a room (no payment integration).
- Track booking history and status.
- Switch between English and Vietnamese

### 🔐 Admin
- Login to admin panel.
- Manage room list (Add / Edit / Delete).
- Manage bookings (Confirm / Archive).

## 🛠️ Tech Stack

### 🌐 Frontend
- ReactJS (developed with Visual Studio Code)
- React Router, Axios
- i18next for internationalization (i18n)

### 🧩 Backend
- Spring Boot (developed with IntelliJ IDEA)
   + Spring Web, Spring Security
   + Spring Data JPA, Hibernate Validator
   + Lombok, MySQL Driver

### 💾 Database
- MySQL ( Managed via Navicat connected to XAMPP MySQL Server )

### ☁️ Other Tools
- AWS S3 – Used to store and serve room images from the cloud.
- Postman – Utilized for testing and debugging RESTful APIs during development.
- Docker – Used to containerize the Spring Boot backend application.
- Docker Hub – Hosts the Docker image, which is pulled by Render for deployment.
