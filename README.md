# 🚗 RentalCar Frontend Project

A modern web application for **RentalCar**, a car rental company. This frontend app allows users to explore available vehicles, apply advanced filters, view detailed listings, and submit rental requests.

## ✨ Features

- 📍 Landing page with banner and call-to-action
- 📂 Vehicle catalog with filtering by brand, price, and mileage
- 🧡 Favorites: users can save cars and persist them across reloads
- 📄 Detailed page for each car with full specs and booking form
- 🔍 Backend-powered pagination and server-side filtering
- ✅ Form validation and success notification on booking
- 📦 Persistent global state using Redux and redux-persist

## 🛠 Technologies

- **React 19** + Vite
- **Redux Toolkit** for global state
- **React Router v7** for navigation
- **Axios** for HTTP requests
- **CSS Modules** (you can replace with MUI or styled-components)
- **Redux Persist** to store favorites in `localStorage`

## 🔗 Live Demo

[🔗 View deployed site on Vercel](https://rental-car-project-n3u3.vercel.app/)

## 📦 Installation

```bash
git clone https://github.com/olenabokhan1121/rental-car-project
cd rental-car-project
npm install
npm run dev


🔐 API Integration
This project is connected to a custom backend API:
RentalCar API Docs
Filtering, pagination and booking are fully powered by backend routes.
📁 Project Structure
src/
├── public/ # Images & static files
├── components/ # Reusable UI components
├── pages/ # Route-specific page components
├── store/ # Redux slices & store config
├── App.jsx # Main app entry
└── main.jsx # Root rendering


Routes

- / → Home page
- /catalog → Catalog with filters & load more
- /catalog/:id → Car detail page with booking form

  👩‍💻 Author
  [Olena Bokhan](https://github.com/olenabokhan1121)— Frontend Developer
  Motivated, systematic, and detail-focused. Passionate about blending functional architecture with elegant design.

```
