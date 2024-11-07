# Etapa de construcción
FROM node:18-alpine AS build

# Establece el directorio de trabajo
WORKDIR /frontend-service

# Copia los archivos de configuración de npm
COPY client/package.json client/package-lock.json* ./

# Instala solo las dependencias de producción
RUN npm ci --production --verbose

# Copia el resto del código de la aplicación
COPY client/ .

# Construye la aplicación para producción
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copia los archivos construidos desde la etapa anterior
COPY --from=build /frontend-service/dist /usr/share/nginx/html

# Copia configuración de nginx si es necesario (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expone el puerto en el que servirá nginx
EXPOSE 5173

# Comando para iniciar nginx en modo de primer plano
CMD ["nginx", "-g", "daemon off;"]