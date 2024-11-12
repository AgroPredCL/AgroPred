# Usa la imagen base oficial de Python para Alpine Linux
FROM python:3.10.14-slim-bullseye

# Instala las dependencias necesarias para construir pycairo y otras bibliotecas
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        gcc \
        libc-dev \
        pkg-config \
        libcairo2-dev \
    && rm -rf /var/lib/apt/lists/*

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /model-service

# Copia los archivos de tu aplicación al directorio de trabajo del contenedor
COPY requirements.txt .

# Instala las dependencias necesarias
RUN pip install --no-cache-dir -r requirements.txt

COPY api-modelo /model-service/api-modelo

WORKDIR /model-service/api-modelo

# Expone el puerto en el cual la API expone sus servicios
EXPOSE 8000

# Comando para ejecutar la aplicación cuando el contenedor se inicie
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]