# AgroPred

A brief description of what this project does and its purpose.

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