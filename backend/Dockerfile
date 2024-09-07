# Dockerfile für das Backend
# Verwende ein Node.js-Image als Basis
FROM node:18-alpine

# Setze das Arbeitsverzeichnis
WORKDIR /app

# Kopiere die package.json und package-lock.json zuerst, um Caching von npm install zu ermöglichen
COPY package.json package-lock.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den restlichen Code
COPY . .

# Exponiere Port 3001 für den Backend-Dienst
EXPOSE 3001

# Start der Anwendung
CMD ["npm", "start"]
