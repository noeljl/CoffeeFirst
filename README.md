# Pitch: CoffeeFirst

---

**CoffeeFirst** ist eine **Full-Stack-Plattform**, die Kaffee-Fans und Cafés zusammenbringt.

Die App bietet:
* **Digitale Mitgliedskarten** mit Kaffee-Kontingent
* Eine **nachhaltigkeitsorientierte Café-Suche**
* **Reviews & Ratings**
* Ein **schlankes Zahlungs- & Login-System** (lokal + OAuth)

Technisch besteht das Projekt aus einem **React-Frontend** und einem **Node/Express-Backend auf MongoDB** – alles **ready-to-run per Docker**.

---

## Projektaufbau
CoffeeFirst/
├── backend/ # Express + Mongoose API
│   ├── models/ # DB-Schemas (Member, CoffeeShop, …)
│   ├── services/ # Business-Logik (AuthService u.a.)
│   ├── routes/ # REST-Endpoints (/api/*)
│   ├── loaders/ # Express/Passport/Middleware-Bootstrap
│   └── index.js # Server-Entry-Point
├── frontend/ # React-SPA (CRA)
│   ├── src/ # React-Code & Assets
│   └── public/ # Static Files
├── docker-compose.yml # 3-Service-Setup (frontend, backend, MongoDB)
└── README.md # (dieses Dokument)



### Back-End
* Node 18-Image, startet mit `npm run server`
* Mongoose-Models für Members, Memberships, CoffeeShops u.v.m.

### Front-End
* CRA + Redux Toolkit; Dev-Server auf `:3000`
* API-Basispfad `http://localhost:3001/api`

---

## Docker Compose – Schnellstart

1.  **Images bauen & Container starten**
    ```bash
    docker compose up --build
    ```

2.  **Logs ansehen**
    ```bash
    docker compose logs -f frontend # bzw. backend / mongodb
    ```

3.  **Alles stoppen & aufräumen**
    ```bash
    docker compose down -v
    ```

`docker-compose.yml` definiert drei Services:

| Service  | Port  | Befehl im Container                     |
| :------- | :---- | :-------------------------------------- |
| frontend | 3000  | `npm install && npm start`              |
| backend  | 3001  | `npm install && npm run server`         |
| mongodb  | 27017 | Offizielles `mongo:5`-Image + Healthcheck |

Die Quellordner werden per Bind-Mount eingebunden; Code-Änderungen werden daher live neu geladen (Hot-Reload).

---

## Lokal ohne Docker

**Voraussetzung:** Node ≥ 18 und eine laufende lokale MongoDB.

### Backend
```bash
cd backend
npm install
npm run server # oder einfach: npm start



### Frontend (in neuem Terminal)
cd ../frontend
npm install
npm start

Der Back-End-Server lauscht auf http://localhost:3001, das Front-End auf http://localhost:3000.

Datenquellen & Assets

Art	Speicherort	Herkunft / Lizenzhinweis
Café‑Stammdaten	frontend/src/components/cafe/DummySingleCafeData.js	Selbsterstellt (Demo)
Listen‑Ansicht	frontend/src/components/cafes/CafesData.js	Selbsterstellt (Demo)
Bilder	frontend/src/assets/dummyImages/* (PNG/JPG)	Platzhalter‑Fotos (Unsplash / Eigenaufnahmen) – nicht für Produktion
Icons & SVGs	frontend/src/assets/Icons.js	Gebündelt aus Open‑Source‑Icon‑Sets – MIT / CC‑BY‑Lizenz gemäß jeweiligem Set
Für produktive Deployments bitte echte Café‑Daten (z. B. Yelp API) und lizenzierte Bilder verwenden.

Für produktive Deployments sollten echte Café-Daten (z. B. Yelp-API) und lizenzierte Bilder verwendet werden.


Markdown
# Pitch: CoffeeFirst

---

**CoffeeFirst** ist eine **Full-Stack-Plattform**, die Kaffee-Fans und Cafés zusammenbringt.

Die App bietet:
* **Digitale Mitgliedskarten** mit Kaffee-Kontingent
* Eine **nachhaltigkeitsorientierte Café-Suche**
* **Reviews & Ratings**
* Ein **schlankes Zahlungs- & Login-System** (lokal + OAuth)

Technisch besteht das Projekt aus einem **React-Frontend** und einem **Node/Express-Backend auf MongoDB** – alles **ready-to-run per Docker**.

---

## Projektaufbau

CoffeeFirst/
├── backend/ # Express + Mongoose API
│   ├── models/ # DB-Schemas (Member, CoffeeShop, …)
│   ├── services/ # Business-Logik (AuthService u.a.)
│   ├── routes/ # REST-Endpoints (/api/*)
│   ├── loaders/ # Express/Passport/Middleware-Bootstrap
│   └── index.js # Server-Entry-Point
├── frontend/ # React-SPA (CRA)
│   ├── src/ # React-Code & Assets
│   └── public/ # Static Files
├── docker-compose.yml # 3-Service-Setup (frontend, backend, MongoDB)
└── README.md # (dieses Dokument)


### Back-End
* Node 18-Image, startet mit `npm run server`
* Mongoose-Models für Members, Memberships, CoffeeShops u.v.m.

### Front-End
* CRA + Redux Toolkit; Dev-Server auf `:3000`
* API-Basispfad `http://localhost:3001/api`

---

## Docker Compose – Schnellstart

1.  **Images bauen & Container starten**
    ```bash
    docker compose up --build
    ```

2.  **Logs ansehen**
    ```bash
    docker compose logs -f frontend # bzw. backend / mongodb
    ```

3.  **Alles stoppen & aufräumen**
    ```bash
    docker compose down -v
    ```

`docker-compose.yml` definiert drei Services:

| Service  | Port  | Befehl im Container                     |
| :------- | :---- | :-------------------------------------- |
| frontend | 3000  | `npm install && npm start`              |
| backend  | 3001  | `npm install && npm run server`         |
| mongodb  | 27017 | Offizielles `mongo:5`-Image + Healthcheck |

Die Quellordner werden per Bind-Mount eingebunden; Code-Änderungen werden daher live neu geladen (Hot-Reload).

---

## Lokal ohne Docker

**Voraussetzung:** Node ≥ 18 und eine laufende lokale MongoDB.

### Backend
```bash
cd backend
npm install
npm run server # oder einfach: npm start
Frontend (in neuem Terminal)

Bash
cd ../frontend
npm install
npm start
Der Back-End-Server lauscht auf http://localhost:3001, das Front-End auf http://localhost:3000.

Datenquellen & Assets
Art	Speicherort	Herkunft / Lizenzhinweis
Café-Stammdaten	frontend/src/components/cafe/DummySingleCafeData.js	statisches Mock-JSON (selbsterstellt)
Listen-Ansicht	frontend/src/components/cafes/CafesData.js	selbsterstellt (Demo)
Bilder	frontend/src/assets/dummyImages/* (PNG/JPG)	Platzhalter-Fotos (Unsplash/Eigenaufnahmen) – nicht für Produktion
Icons & SVGs	frontend/src/assets/Icons.js	MIT / CC-BY gemäß Icon-Set
Für produktive Deployments sollten echte Café-Daten (z. B. Yelp-API) und lizenzierte Bilder verwendet werden.

Nützliche NPM-Skripte
Backend (backend/package.json):

Script	Zweck
npm run server	Start mit Nodemon (Hot-Reload)
npm test	Mocha + Chai Test-Suite
npm run create-db	Demo-DB anlegen (Setup-Skript)
Frontend (frontend/package.json):

Script	Zweck
npm start	React Dev-Server
npm run build	Produktions-Build
