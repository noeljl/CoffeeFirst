# Dockerfile für das Backend
# Verwende ein Node.js-Image als Basis
FROM node:18-alpine

# Setze das Arbeitsverzeichnis
WORKDIR /app

# Kopiere die package.json und installiere Abhängigkeiten
COPY package.json package-lock.json ./
RUN npm install

# Kopiere den restlichen Code
COPY . .

# Exponiere Port 3001
EXPOSE 3001

# Start der Anwendung
CMD ["npm", "start"]