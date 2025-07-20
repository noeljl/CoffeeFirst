# CoffeeFirst

**CoffeeFirst** is a **full-stack platform** that brings coffee enthusiasts and cafés together.

The app offers:
- **Digital membership cards** with coffee quotas
- **A sustainability-focused café search**
- **Reviews & ratings**
- **A streamlined payment & login system** (local + OAuth)

Technically, the project consists of a **React frontend** and a **Node/Express backend on MongoDB** – everything **ready-to-run via Docker**.

---

## Project Structure

```
CoffeeFirst/
├── backend/              # Express + Mongoose API
│   ├── models/          # DB schemas (Member, CoffeeShop, …)
│   ├── services/        # Business logic (AuthService etc.)
│   ├── routes/          # REST endpoints (/api/*)
│   ├── loaders/         # Express/Passport/Middleware bootstrap
│   └── index.js         # Server entry point
├── frontend/            # React SPA (CRA)
│   ├── src/            # React code & assets
│   └── public/         # Static files
├── docker-compose.yml   # 3-service setup (frontend, backend, MongoDB)
└── README.md           # This document
```

## Getting Started

This project is a web application that allows users to find and share information about cafés. It features a frontend built with React and a backend developed with Node.js and MongoDB. The application can be run either with Docker or manually using npm commands.

### Prerequisites

- Docker and Docker Compose (recommended)
- Node.js and npm (for manual setup)
- MongoDB (for manual setup)

## Running with Docker (Recommended)

The `docker-compose.yml` file defines three services: `frontend`, `backend`, and `mongodb`.

- **`frontend`**: Builds and runs the React application on port 3000
- **`backend`**: Builds and runs the Node.js application on port 3001
- **`mongodb`**: Runs a MongoDB instance on port 27017

### Commands

**Start the application:**
```bash
docker-compose up
```

**Stop the application:**
```bash
docker-compose down
```

## Running Without Docker

### Frontend

```bash
cd frontend
npm install
npm start
```

The frontend will be available at `http://localhost:3000`

### Backend

```bash
cd backend
npm install
npm start
```

The backend API will be available at `http://localhost:3001`

### Database

Make sure you have MongoDB running locally on port 27017, or update the connection string in your backend configuration.

## Data Sources

- **Images:** Image data is sourced from the `/frontend/src/assets` directory
- **Café data:** Café data is retrieved from the MongoDB database

## Features

- Digital membership cards with coffee quotas
- Sustainability-focused café search and discovery
- User reviews and ratings system
- Streamlined authentication (local + OAuth)
- Responsive React frontend
- RESTful API backend
- MongoDB data persistence

## Technology Stack

**Frontend:**
- React (Create React App)
- Modern JavaScript (ES6+)

**Backend:**
- Node.js
- Express.js
- Mongoose (MongoDB ODM)
- Passport.js (Authentication)

**Database:**
- MongoDB

**DevOps:**
- Docker
- Docker Compose