# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /frontend-service

# Copia los archivos de configuración de npm
COPY client/package.json client/package-lock.json* ./ 

# Instala las dependencias del proyecto
RUN npm ci --verbose

# Copia el resto del código de la aplicación
COPY client/ .

# Construye la aplicación (esto generará la carpeta dist)
RUN npm run build

# Instala un servidor estático para servir los archivos construidos
RUN npm install -g serve

# Exponemos el puerto donde se servirá la aplicación
EXPOSE 5173

# Usamos 'serve' para servir los archivos construidos en la carpeta dist
CMD ["serve", "-s", "dist", "-l", "5173"]
