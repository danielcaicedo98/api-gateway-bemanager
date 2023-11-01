# Usar una imagen base con Node.js
FROM node:14

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar todo el código fuente al contenedor
COPY . .

# Exponer el puerto en el que se ejecutará la aplicación Express
EXPOSE 8005

# Comando para iniciar la aplicación
CMD [ "node", "api-gateway/index.js" ]
