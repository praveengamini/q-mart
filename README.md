# 🛍️ Q-Mart - MERN E-Commerce Platform

## 🌟 Overview
A full-featured e-commerce solution built with:
- **MongoDB** (Database)
- **Express.js** (Backend framework)
- **React.js** (Frontend with Vite)
- **Node.js** (Runtime environment)

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- npm
- MongoDB Atlas account

### Installation
```bash
git clone https://github.com/praveengamini/q-mart
cd q-mart
npm install
cd client && npm install
cd ../server && npm install
cd ..

# Server Configuration
PORT=5000

# Database Configuration
MONGODB_URI=your_mongodb_atlas_connection_string

# Authentication Configuration
JWT_SECRET=your_strong_jwt_secret_key
JWT_EXPIRE=30d
COOKIE_EXPIRE=30

# Cloudinary Configuration
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
## 🚀 Run the Application

### Frontend (client)
```bash
cd client
npm run dev
# Runs on http://localhost:3000
### Backend (sever)
```bash
cd server
npm run dev
# Runs on http://localhost:5000

👑 Admin Access
Access MongoDB Atlas

Go to users collection

Find user document

Change role from "user" to "admin"

✨ Features
Client Side
User authentication (Login/Register)

Product browsing with filters

Shopping cart functionality

Order placement and history

User profile management

Admin Panel
Full product management (CRUD)

Order processing system

User management

Sales analytics dashboard

🛠️ Tech Stack
Frontend:

React with Vite

Redux for state management

React Router

Axios for API calls

Tailwind CSS

Backend:

Node.js

Express.js

Mongoose ODM

JWT Authentication

Cloudinary for image storage

Nodemailer for emails
