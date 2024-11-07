# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /frontend-service

# Copia los archivos de configuración de npm
COPY client/package.json client/package-lock.json* ./

# Instala las dependencias de producción
RUN npm ci --only=production --verbose

# Copia el resto del código de la aplicación
COPY client/ .

# Construye la aplicación para producción (esto generará la carpeta dist)
RUN npm run build

# Instala un servidor estático para servir los archivos construidos
RUN npm install -g serve

# Expone el puerto en el que se servirá la aplicación
EXPOSE 5173

# Sirve la aplicación desde la carpeta dist
CMD ["serve", "-s", "dist", "-l", "5173"]