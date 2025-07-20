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

```
CoffeeFirst/
├── backend/                # Express + Mongoose API
│   ├── models/            # DB-Schemas (Member, CoffeeShop, …)
│   ├── services/          # Business-Logik (AuthService u.a.)
│   ├── routes/            # REST-Endpoints (/api/*)
│   ├── loaders/           # Express/Passport/Middleware-Bootstrap
│   └── index.js           # Server-Entry-Point
├── frontend/              # React-SPA (CRA)
│   ├── src/               # React-Code & Assets
│   └── public/            # Static Files
├── docker-compose.yml     # 3-Service-Setup (frontend, backend, MongoDB)
└── README.md              # (dieses Dokument)
```

# Projekt-Readme

Dieses Projekt ist eine Webanwendung, die es Benutzern ermöglicht, Informationen über Cafés zu finden und zu teilen. Es verfügt über ein Frontend, das mit React erstellt wurde, und ein Backend, das mit Node.js und MongoDB entwickelt wurde. Die Anwendung kann entweder mit Docker oder manuell mit npm-Befehlen ausgeführt werden.

## Projektstruktur

Das Projekt ist in zwei Hauptteile gegliedert:
* **Frontend:** Der Frontend-Code befindet sich im `/frontend`-Verzeichnis und wurde mit Create React App erstellt.
* **Backend:** Der Backend-Code befindet sich im `/backend`-Verzeichnis und verwendet Node.js und Express.js. Es stellt eine API für das Frontend bereit und stellt eine Verbindung zu einer MongoDB-Datenbank her.

## Docker Compose

Die `docker-compose.yml`-Datei definiert drei Dienste: `frontend`, `backend` und `mongodb`.
* `frontend`: Baut und führt die React-Anwendung auf Port 3000 aus.
* `backend`: Baut und führt die Node.js-Anwendung auf Port 3001 aus.
* `mongodb`: Führt eine MongoDB-Instanz auf Port 27017 aus.

### Befehle

* **Starten:** `docker-compose up`
* **Herunterfahren:** `docker-compose down`

## Ohne Docker ausführen

### Frontend

```bash
cd frontend
npm install
npm start
```

### Backend

```bash
cd backend
npm install
npm start
```

## Datenursprung

* **Bilder:** Bilddaten werden aus dem Verzeichnis `/frontend/src/assets` bezogen.
* **Café-Daten:** Café-Daten werden aus der MongoDB-Datenbank abgerufen.