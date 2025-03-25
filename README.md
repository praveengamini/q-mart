E-Commerce Website - MERN Stack
Overview
This is a full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, React, and Node.js). The project features a client-facing e-commerce store and an admin panel for managing products, orders, and users. The frontend is built with React using Vite for optimized performance.


Project Structure
Copy
ecommerce-website/
├── client/          # Frontend React application (Vite)
├── server/          # Backend Node.js/Express application
├── .gitignore
└── README.md
Prerequisites
Before running the project, ensure you have the following installed:

Node.js (v14 or higher)

npm (comes with Node.js)

MongoDB Atlas account (for database)

Setup Instructions
Clone the repository

git clone [https://github.com/praveengamini/q-mart]
cd ecommerce-website
Install dependencies for both client and server


npm install
cd client
npm install
cd ../server
npm install
cd ..
Environment Variables Setup

Create a .env file in the server directory with the following variables:

Copy
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
Running the Application

npm run dev
This command will start both the client (React) and server (Node.js) concurrently.

Admin Access
By default, all new users are registered as normal users. To grant admin privileges:

Access your MongoDB Atlas cluster

Navigate to the users collection

Find the user you want to make admin

Update the role field from user to admin

Features
Client Side
User registration and authentication

Product browsing and filtering

Shopping cart functionality

Order placement and history

User profile management

Admin Panel
Product management (CRUD operations)

Order management

User management

Sales analytics and reports

Available Scripts
In the project root directory, you can run:

npm run server: Starts only the backend server

npm run client: Starts only the frontend client

Technologies Used
Frontend
React.js (with Vite)

React Router

Redux (for state management)

Axios (for API calls)

Tailwind CSS (or your CSS framework)

Backend
Node.js

Express.js

MongoDB (with Mongoose ODM)

JWT (for authentication)

Support
For any issues or questions, please contact [praveegamini009@gmail.com].
