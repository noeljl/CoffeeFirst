Pitch: CoffeeFirst
CoffeeFirst is a full-stack platform that brings coffee lovers and cafés together.

The app offers:

Digital membership cards with coffee quotas

A sustainability-oriented café search

Reviews & Ratings

A lean payment & login system (local + OAuth)

Technically, the project consists of a React frontend and a Node/Express backend on MongoDB—all ready-to-run via Docker.

Project Structure
CoffeeFirst/
├── backend/ # Express + Mongoose API
│   ├── models/ # DB-Schemas (Member, CoffeeShop, …)
│   ├── services/ # Business Logic (AuthService, etc.)
│   ├── routes/ # REST-Endpoints (/api/*)
│   ├── loaders/ # Express/Passport/Middleware-Bootstrap
│   └── index.js # Server Entry Point
├── frontend/ # React-SPA (CRA)
│   ├── src/ # React Code & Assets
│   └── public/ # Static Files
├── docker-compose.yml # 3-Service Setup (frontend, backend, MongoDB)
└── README.md # (this document)
Back-End

Node 18-Image, starts with npm run server

Mongoose Models for Members, Memberships, CoffeeShops, and more

Front-End

CRA + Redux Toolkit; Dev server on :3000

API base path http://localhost:3001/api

Docker Compose – Quick Start
Build Images & Start Containers

Bash
docker compose up --build
View Logs

Bash
docker compose logs -f frontend # or backend / mongodb
Stop All & Clean Up

Bash
docker compose down -v
docker-compose.yml defines three services:

Service	Port	Command in Container
frontend	3000	npm install && npm start
backend	3001	npm install && npm run server
mongodb	27017	Official mongo:5-Image + Healthcheck
Source folders are mounted via bind mounts, so code changes are hot-reloaded live.

Local Without Docker
Prerequisite: Node 
geq 18 and a running local MongoDB.

Backend

Bash
cd backend
npm install
npm run server # or simply: npm start
Frontend (in a new terminal)

Bash
cd ../frontend
npm install
npm start
The backend server listens on http://localhost:3001, and the frontend on http://localhost:3000.

Data Sources & Assets
Type	Storage Location	Origin / License Information
Café Master Data	frontend/src/components/cafe/DummySingleCafeData.js	Static mock-JSON (self-created)
List View	frontend/src/components/cafes/CafesData.js	Self-created (demo)
Images	frontend/src/assets/dummyImages/* (PNG/JPG)	Placeholder photos (Unsplash/self-taken) – not for production
Icons & SVGs	frontend/src/assets/Icons.js	MIT / CC-BY according to icon set
For productive deployments, please use real café data (e.g., Yelp API) and licensed images.

Useful NPM Scripts
Backend (backend/package.json):

Script	Purpose
npm run server	Start with Nodemon (Hot-Reload)
npm test	Mocha + Chai Test-Suite
npm run create-db	Create demo DB (Setup script)
Frontend (frontend/package.json):

Script	Purpose
npm start	React Dev-Server
npm run build	Production Build