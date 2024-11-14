# Usa una imagen base de Node.js
FROM node:18-alpine

# Instala serve globalmente
RUN npm install -g serve

# Establece el directorio de trabajo
WORKDIR /frontend-service

# Copia los archivos de configuración de npm
COPY client/package.json client/package-lock.json* ./

# Instala dependencias sin modificar el package-lock.json
RUN npm ci --verbose

# Copia el resto del código de la aplicación
COPY client/ .

# Compila la aplicación para producción
RUN npm run build

# Expone el puerto en el que se servirá la aplicación
EXPOSE 5173

# Comando para servir la aplicación
CMD ["serve", "-s", "dist", "-l", "5173"]