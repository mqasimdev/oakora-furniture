# UK Furniture Co. - Full Stack E-commerce Application

A professional furniture e-commerce website built for a UK-based furniture company.

## Tech Stack

**Backend:**
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication

**Frontend:**
- React (Vite)
- Styled Components
- Context API (State Management)
- React Router v6

## Features
- Premium UK-style design
- Product Search & Filtering (Category, Price)
- Shopping Cart
- User Authentication (Login/Register)
- Checkout Process (Cash On Delivery)
- User Dashboard (Order History)
- Admin Seeding Script

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running locally on default port (27017)

### 1. Backend Setup

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Seed the database with sample UK furniture products:
   ```bash
   node seeder.js
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`.

### 2. Frontend Setup

1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to `http://localhost:5173` (or the port shown in the terminal).

## Default Users

- **Admin User:** admin@example.com / password123
- **Test User:** john@example.com / password123
