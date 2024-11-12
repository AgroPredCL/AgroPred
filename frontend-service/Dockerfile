# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /frontend-service

# Copia los archivos de configuración de npm
COPY client/package.json client/package-lock.json* ./

# Instala dependencias sin modificar el package-lock.json
RUN npm ci --verbose

# Instala dotenv
RUN npm install dotenv

# Copia el resto del código de la aplicación
COPY client/ .

# Construye la aplicación
RUN npm run build

# Instala un servidor estático para servir los archivos construidos
RUN npm install -g serve

# Expone el puerto en el que se servirá la aplicación
EXPOSE 5173

# Comando para servir la aplicación
CMD ["serve", "-s", "dist", "-l", "5173"]
