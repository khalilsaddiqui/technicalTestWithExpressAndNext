

# Next.js and Express.js Application

This project is a combination of a Next.js frontend application and an Express.js backend server. It provides user authentication, profile management, and analytics features.

## Frontend (Next.js)

The frontend part of the application is built with Next.js and provides a user interface for registration, login, profile management, and analytics dashboard.

### Features

- User Registration: Users can register with the application.
- User Login: Registered users can log in to access their profile.
- Profile Management: Users can create and update their profile information (e.g., name, email, avatar).
- File Upload: Allows users to upload an avatar for their profile.
- Custom Analytics Middleware (Advanced Feature Option B): Middleware for logging API usage statistics and providing insights through a simple API endpoint.

## Backend (Express.js)

The backend part of the application is built with Express.js and provides RESTful APIs for user authentication, profile management, and analytics.

### Features

- User Authentication: Implements JWT-based authentication for secure access to protected routes.
- User Registration: Provides API endpoints for user registration.
- User Login: Provides API endpoints for user login.
- Profile Management: Allows users to create and update their profile information.
- File Upload: Supports file upload for user avatars.
- Analytics Middleware: Logs API usage statistics and provides insights through a simple API endpoint.

## Getting Started

Follow the instructions below to set up and run both the frontend and backend parts of the application.

### Frontend (Next.js)

#### Prerequisites

- Node.js   v18.17.0 or later installed on your machine. 

#### Installation

1. Navigate to the `client` directory:

   ```bash
   cd client

   npm run dev 
### Backend (Express.js)

#### Prerequisites

- Node.js
- npm i
- MongoDB installed on your machine or use url 
#### Installation
2. Navigate to the `server`   

  ```bash
   cd server

   npm run start:local 

3. find Postman collection and Environment in main folder 
4. use this collection  to test all routes
