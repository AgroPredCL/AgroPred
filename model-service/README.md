## Instalacion de dependencias y ejecucion de la API

```bash
# Instalar dependencias
pip install requirements.txt

# Irse al directorio donde esta main.py
cd model-service/api-modelo/

# Ejecutar API
uvicorn main:app --reload

```

## Queries

```bash
# Endpoint: http://localhost:3000/disease/fruit/
curl 'http://127.0.0.1:8000/diseases?image_number=0005' -H 'accept: application/json'

# Endpoint: http://localhost:3000/state
curl -X GET "http://127.0.0.1:8000/state?start_date=2023-01-01&end_date=2023-01-02"

# Endpoint: http://localhost:3000/state/<nutriente>
curl -X GET "http://127.0.0.1:8000/state/nitrogeno"

# Endpoint: http://localhost:3000/prediction/NPK
curl 'http://127.0.0.1:8000/prediction/NPK?diasAPredecir=<dias a predecir>' -H 'accept: application/json'

```