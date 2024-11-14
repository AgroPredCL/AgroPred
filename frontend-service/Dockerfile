# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /frontend-service

# Copia los archivos de configuración de npm
COPY client/package.json client/package-lock.json* ./

# Instala dependencias sin modificar el package-lock.json
RUN npm ci --verbose

# Copia el resto del código de la aplicación
COPY client/ .

# Expone el puerto en el que se servirá la aplicación
EXPOSE 5173

# Comando para servir la aplicación
CMD ["npm", "run", "dev"]