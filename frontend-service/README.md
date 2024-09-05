# Ejecutar Docker container

 ```bash
# Dentro de la carpeta frontend-service (?)

# Para crear la imagen si no existe, o actualizarla
docker build -t frontend-service-node:0

# Para ejecutar un container a partir de la imagen creada o ya existente
docker run -p 5173:5173 --name frontend-container frontend-service-node:0
```