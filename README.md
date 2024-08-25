# AgroPred

Proyecto de AgroPred

## Table of Contents

- [Docker](#Docker)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Team](#team)
- [License](#license)
- [Contact](#contact)

## Docker
### Creacion de todas las imagenes y containers en su totalidad
#### Dentro de la carpeta ~./AgroPred
```bash
# Para crear las imagenes
$ docker-compose build

# Para ejecutar los contenedores
$ docker-compose up
```
Esto hace lo siguiente:
1. Crea las imagenes respectivas para cada servicio:
    - Backend (Base de datos y API)
    - Frontend
    - Modelos
2. Crea un contenedor a partir de cada imagen.
3. Ejecuta los 4 contenedores al mismo tiempo.

#### Si se quieren ejecutar contenedores particulares y no todos
```bash
# docker-compose up <nombre-del-contenedor>, tal que:
$ docker-compose up db api-backend
```

Esto hace lo siguiente:
1. Ejecuta los 2 contenedores especificados al mismo tiempo. Se pueden ejecutar cualquiera en cualquier orden.

Los contenedores disponibles son:
- db
- backend
- frontend
- model-service

Importante considerar que tanto la base de datos como los modelos de ML no estan dentro de sus contenedores respectivos, por lo que se crea un volumen respectivo para la base de datos
y para los modelos, es decir, se utilizaran los modelos locales que esten dentro de la carpeta /modelos y los datos locales de la base de datos de posgresql.

### Creacion de cada contenedor individualmente
```bash
# Dentro de la carpeta respectiva (../backend-service ~ ../frontend-service ~ ../model-service)
docker-compose up
```
Esto crea la imagen y el contenedor respectivo, creando unicamente el que se considere dentro de la carpeta.


## Installation

Instructions on how to set up the project locally.

```bash
# Clone the repository
git clone https://github.com/AgroPredCL/AgroPred.git

# Navigate to the project directory
cd AgroPred

# E intenta ingresar tu información para asegurarse que funciono correctamente el clone y que puedes hacer push
```
### Luego se deben ejecutar:
- modelos
- backend
- frontend

## Usage

### Queries de las apis:
#### app-service (port: 3000):
- 

- http://localhost:3000/predios : Entrega todos 
- http://localhost:3000/uploadImage ||| Aun sin funcionar

### api-modelo (port: 8000)
- GET stateHistoricoGeneral: Entrega los valores historicos de nitrogeno, potasio, fosforo, humedad, conductividad electrica, ph y temperatura.
    - http://0.0.0.0:8000/state
    - return:
``` {"nitrogeno": nitrogeno, "potasio": potasio, "fosforo": fosforo,"humedad": humedad,"conductividad": conductividad,"ph": ph,"temperatura": temperatura} ```

    donde cada variables tiene la forma:
``` {"nitrogeno": [{"fecha": "2023-01-01", "hora": "03:00:00", "valor": 183.22}, {...}], ... }```

- GET state<valor>: Entrega el estado actual, el valor actual, el estado promedio y el valor promedio del valor pedido.
    - http://0.0.0.0:8000/state/conductividad
    - http://0.0.0.0:8000/state/nitrogeno
    - http://0.0.0.0:8000/state/potasio
    - http://0.0.0.0:8000/state/fosforo
    - http://0.0.0.0:8000/state/ph
    - http://0.0.0.0:8000/state/humedad
    - http://0.0.0.0:8000/state/temperatura

    - return:
    ``` {"estadoActual": "Adecuado", "valorActual": 6.32, "estadoPromedio": "Adecuado", "valorPromedio": 6.5} ```

- GET enfermedad segun imagen: Dada el numero de imagen (0001 en este caso)
    - http://127.0.0.1:8000/diseases?image_number=0001
    - return: ``` {
  "fecha": "2021-10-10",
  "enfermedades": {
    "asfixia radicular": {
      "estado": "asfixia radicular",
      "descripcion": "Asfixia Radicular is a disease that affects the roots of the avocado tree. It is caused by poor drainage and waterlogging of the soil, which leads to a lack of oxygen in the root zone.",
      "impacto": "alto",
      "confiabilidad": "x%"
    },
    "healthy": {
      "estado": "healthy",
      "descripcion": "The avocado is healthy and free from any disease.",
      "impacto": "sin impacto",
      "confiabilidad": "75%"
    }
  }
} ```

- http://127.0.0.1:8000/state?start_date=2023-01-01&end_date=2023-01-02
- http://127.0.0.1:8000/prediction/NPK?diasAPredecir=14

## Team
- **Name 1** - *Role/Responsibility* - [GitHub Profile](https://github.com/username1)
  - **Email**: [name1@example.com](mailto:name1@example.com)

- **Name 2** - *Role/Responsibility* - [GitHub Profile](https://github.com/username2)
  - **Email**: [name2@example.com](mailto:name2@example.com)

- **Name 3** - *Role/Responsibility* - [GitHub Profile](https://github.com/username3)
  - **Email**: [name3@example.com](mailto:name3@example.com)

- **Name 4** - *Role/Responsibility* - [GitHub Profile](https://github.com/username4)
  - **Email**: [name4@example.com](mailto:name4@example.com)

- **Francisca Henríquez** - *UI/UX* - [GitHub Profile](https://github.com/FranciscaHenriquez)
  - **Email**: [franisca.henriquezr@usm.cl](mailto:francisca.henriquezr@usm.cl)

- **Felipe San Martín** - *DB/BACKEND/IA* - [GitHub Profile](https://github.com/Felipesanmartini)
  - **Email**: [name6@example.com](mailto:felipe.sanmartini@usm.cl)

- **Name 7** - *Role/Responsibility* - [GitHub Profile](https://github.com/username5)
  - **Email**: [name7@example.com](mailto:name7@example.com)

- **Name 8** - *Role/Responsibility* - [GitHub Profile](https://github.com/username5)
  - **Email**: [name8@example.com](mailto:name7@example.com)