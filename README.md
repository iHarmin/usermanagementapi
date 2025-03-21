# User Management API System

## Overview

A User Management API System built with **Node.js**, **Express.js**, **HTML**, **CSS**, **JavaScript**, **Swagger** for API Documentation and **MySQL**, designed to handle core functionalities such as user registration, login, profile updates, and deletion. This project includes comprehensive API documentation and unit testing for ensuring functionality and reliability.

---

## Author Information

- **Name**: [Harmin Patel](https://github.com/iHarmin)
- **Date Created**: 13th December, 2024
- **Last Edited**: 16th December, 2024

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, JavaScript
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Token)
- **Testing**: Mocha, Chai, Chai-HTTP
- **API Documentation**: Swagger (Swagger-UI-Express, Swagger-JSDoc)
- **Environment Variables**: dotenv

---

## Features

- **User Registration**: Create a new user profile.
- **User Login**: Authenticate users with email and password.
- **Profile Retrieval**: Fetch user profiles by ID or get all users.
- **Profile Update**: Update user details such as email, name, and password.
- **Profile Deletion**: Delete user profiles permanently.
- **JWT Authentication**: Secure API endpoints with token-based authentication.
- **API Documentation**: Detailed documentation using Swagger.
- **Unit Testing**: Tried comprehensive tests using Mocha, Chai, and Chai-HTTP.

---

## Prerequisites

Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MySQL](https://www.mysql.com/) (v8.0+ recommended)

---

## Setup Instructions

### 1. Clone the Repository
Open Terminal (for Mac) or Open Command Prompt (for Windows):
- git clone https://github.com/iHarmin/usermanagementapi.git
- cd usermanagementapi

### 2. Install these dependencies
- npm install express
- npm install dotenv
- npm install mysql
- npm install bcrypt
- npm install mocha chai chai-http --save-dev
- npm install jsonwebtoken
- npm install swagger-jsdoc swagger-ui-express

### 3. Create .env file
- PORT=3000
- MYSQL_PORT= **Enter your port number**
- MYSQL_HOST=localhost
- MYSQL_USER= **Enter your database user name** (For example: root)
- MYSQL_PASSWORD= **Enter your Database password**
- MYSQL_DATABASE=usermgmtapi
- JWT_KEY=qwe1234

### 4. Set Up the Database on MySQL

### 5. Run the Application
- node app.js

---

## API Documentation
Detailed API documentation is available at:
http://localhost:3000/api-docs
- **This documentation is built using Swagger and includes all endpoints, request/response formats, and authentication methods.**