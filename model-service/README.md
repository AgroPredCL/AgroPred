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

<<<<<<< HEAD
# Endpoint: http://localhost:3000/prediction/NPK
curl 'http://127.0.0.1:8000/prediction/NPK?diasAPredecir=<dias a predecir>' -H 'accept: application/json'
=======
- Asfixia radicular (SUELO):
    - Descripcion: Condición en la que las raíces de los árboles de paltos se ven privadas de oxígeno debido a la saturación del suelo con agua. Esto ocurre cuando el suelo permanece excesivamente húmedo durante períodos prolongados, lo que limita la capacidad de las raíces para obtener oxígeno necesario para su funcionamiento y metabolismo adecuado. Como resultado, las raíces pueden debilitarse, el crecimiento de las plantas se ve afectado, y pueden aparecer síntomas como amarillamiento de las hojas, defoliación y eventualmente un declive general en la salud del árbol. La asfixia radicular puede ser causada por factores como el riego excesivo, suelos mal drenados, o condiciones de suelo compactado que impiden el flujo de oxígeno hacia las raíces.
>>>>>>> 16dd08ec5f6e49e2f027e4cdc73b5ebcab1dfe78

```