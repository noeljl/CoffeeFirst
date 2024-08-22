# Dockerfile für das Frontend
# Verwende ein Node.js-Image als Build-Umgebung
FROM node:18-alpine AS build

# Setze das Arbeitsverzeichnis
WORKDIR /app

# Kopiere die package.json und installiere Abhängigkeiten
COPY package.json package-lock.json ./
RUN npm install

# Kopiere den restlichen Code und baue das Frontend
COPY . ./
RUN npm run build

# Verwende ein nginx Image, um die Anwendung zu hosten
FROM nginx:alpine

# Kopiere die Build-Dateien nach nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponiere Port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]