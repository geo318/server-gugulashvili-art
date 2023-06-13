# Gugulashvili Art Api

Welcome to the Gugulashvili Art Backend! This backend server is built with Express.js and utilizes MongoDB Atlas for data storage. It provides an API for managing artwork data and image uploads for the Gugulashvili Art website.
See frontend: [Gugulashvili Art Frontend](https://github.com/geo318/zuragugulashvili-art)


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with the Gugulashvili Art Backend, follow these steps:

1. Clone the repository to your local machine using `git clone <repository-url>`.
2. Navigate to the project directory.
3. Run `npm install` to install the necessary dependencies.
4. Rename the `.env.example` file to `.env` and provide the required environment variables.

## Usage

Once you have installed the dependencies and set up the environment variables, you can start the Gugulashvili Art Backend. Here are some available scripts:

- `npm start`: Starts the backend server in production mode.
- `npm run dev`: Starts the backend server in development mode using nodemon for automatic restarts.

## Technologies

The Gugulashvili Art Backend is built using the following technologies and packages:

- ![Express.js](https://img.shields.io/badge/-Express.js-000?logo=express&logoColor=white): A fast and minimalist web application framework for Node.js.
- ![MongoDB Atlas](https://img.shields.io/badge/-MongoDB%20Atlas-47A248?logo=mongodb&logoColor=white): A fully managed cloud database service for modern applications.
- ![Mongoose](https://img.shields.io/badge/-Mongoose-47A248?logo=mongoose&logoColor=white): An elegant MongoDB object modeling tool for Node.js.
- ![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?logo=typescript&logoColor=white): A statically typed superset of JavaScript that compiles to plain JavaScript.
- ![Sharp](https://img.shields.io/badge/-Sharp-713C94?logo=sharp&logoColor=white): A high-performance image processing library for Node.js.
- ![Multer](https://img.shields.io/badge/-Multer-FFD700?logo=node.js&logoColor=white): A middleware for handling multipart/form-data, primarily used for file uploads.

Feel free to explore the documentation of each technology and package for more information on how to use them effectively in your project.

## Project Structure

The structure of the project is organized as follows:

```
├── src/
│ ├── config/
│ ├── controllers/
│ │ ├── LoginController.ts
│ │ └── ...
│ ├── hekpers/
│ ├── middlewares/
│ ├── models/
│ │ ├── auth.ts
│ │ ├── painting.ts
│ │ └── ...
│ ├── routes/
│ ├── utils/
│ │ ├── resize.ts
│ │ └── ...
│ ├── app.ts
│ ├── server.ts
│ └── ...
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── ...
```

## API Routes

The Gugulashvili Art Backend provides the following API routes:

- `/auth`
  - `POST /login`: User login route. Accepts a JSON payload with the user's credentials and returns a JWT token upon successful authentication.
  
- `/user`
  - `GET /check`: Route to check the authentication status of a user. Requires a valid JWT token in the request headers. Uses the `isAuth` middleware to verify the token and retrieve the authenticated user's information.

- `/paintings`
  - `GET /`: Get all paintings.
  - `POST /upload`: Upload a painting. Requires authentication using the `isAuth` middleware. Accepts a single image file named `img` in the request body.
  - `PATCH /update/:paintingId`: Update a painting by ID. Requires authentication using the `isAuth` middleware. Accepts a single image file named `img` in the request body.
  - `DELETE /delete/:paintingId`: Delete a painting by ID. Requires authentication using the `isAuth` middleware.

Refer to the source code in the `routes` directory for detailed route implementations.

---



