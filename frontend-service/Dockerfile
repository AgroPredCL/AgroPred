# Usa una imagen base de Node.js
FROM node:alpine3.20

# Establece el directorio de trabajo
WORKDIR /frontend-service

# Copia los archivos de configuración de npm
COPY client/package.json client/package-lock.json* ./

RUN npm ci --verbose

# Copia el resto del código de la aplicación
COPY client/ .

# Instala un servidor estático para servir los archivos construidos
RUN npm install -g serve

# Expone el puerto en el que se servirá la aplicación
EXPOSE 5173

CMD ["npm", "run", "dev"]
