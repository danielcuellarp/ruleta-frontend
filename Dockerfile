# Imagen de NodeJS
FROM node:13.14

# Directorio destino
WORKDIR /app

# Copiar el archivo de los modulos
COPY package*.json ./

# Instalar los modulos
RUN npm install

# Instalar framework Vue.js
RUN npm install -g @vue/cli-service

# Copiar todo el contenido del proyecto
COPY . .

# Construir aplicacino
RUN npm run build

EXPOSE 8080