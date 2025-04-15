# Student Table Management System

A full-stack web application for managing student information with CRUD operations.

## Technologies Used

### Frontend

- React.js
- Vite (Build tool)
- CSS for styling
- Node.js (Runtime environment)

### Backend

- Node.js
- Express.js
- PostgreSQL (Database)
- Docker (Containerization)

## Prerequisites

Before you begin, ensure you have installed:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- PostgreSQL (Database)
- Docker (optional, for containerization)

## Installation and Setup

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd vite-project
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the backend server:

```bash
npm start
```

The backend server will run on `http://localhost:3000`

## Features

- Create new student records
- View list of all students
- View detailed student information
- Edit existing student information
- Delete student records

## Project Structure

```
├── backend/           # Backend server files
│   ├── config/        # Database configuration
│   ├── models/        # Database models
│   └── server.js      # Main server file
│
└── vite-project/      # Frontend React application
    ├── src/
    │   ├── CreateStudent/    # Student creation component
    │   ├── EditStudent/      # Student editing component
    │   ├── StudentTable/     # Student list view component
    │   └── ViewStudentDetails/ # Detailed student view
```

## Environment Requirements

- Node.js v14 or higher
- npm v6 or higher
- Modern web browser
- MongoDB v4.4 or higher

## Development Platform

This application can be developed and run on:

- Windows
- macOS
- Linux

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
