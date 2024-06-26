from fastapi import FastAPI, Query
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from tensorflow.keras.applications.inception_v3 import preprocess_input
<<<<<<< HEAD
from typing import Optional
from functions import stateController, predictController, tieneAsfixiaRadicular, stateNitrogeno, statePotasio, stateFosforo, statePH, stateHumedad, stateTemperatura, stateConductividad, tieneEnfermedadFruta
=======

def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(128, 128))
    img_array = image.img_to_array(img)
    img_array_expanded_dims = np.expand_dims(img_array, axis=0)
    return preprocess_input(img_array_expanded_dims)

model = load_model('./Avocado_classification_Inception_v1.h5')
>>>>>>> 16dd08ec5f6e49e2f027e4cdc73b5ebcab1dfe78

app = FastAPI()

@app.get("/")
async def root():
    return {"how to test?": "http://localhost:8000/disease/fruit/{number of image (xxxx)}"}

<<<<<<< HEAD
@app.get("/state")
async def stateHistoricoGeneral(start_date: Optional[str] = Query(None, description="Start date in format YYYY-MM-DD"), end_date: Optional[str] = Query(None, description="End date in format YYYY-MM-DD")):
    if not start_date or not end_date:
        return {"error": "Por favor agrega fecha de inicio y fin para entregar el estado, en formato 'YYYY-MM-DD'."}
    
    nitrogeno, potasio, fosforo = stateController(start_date, end_date)
    
    return {"nitrogeno": nitrogeno, 
            "potasio": potasio, 
            "fosforo": fosforo}

@app.get("/state/nitrogeno")
async def currentStateNitrogeno():
    json = stateNitrogeno()
    return json

@app.get("/state/potasio")
async def currentStatePotasio():
    json = statePotasio()
    return json

@app.get("/state/fosforo")
async def currentStateFosforo():
    json = stateFosforo()
    return json

@app.get("/state/ph")
async def currentStatePH():
    json = statePH()
    return json

@app.get("/state/humedad")
async def currentStateHumedad():
    json = stateHumedad()
    return json

@app.get("/state/temperatura")
async def currentStateTemperatura():
    json = stateTemperatura()
    return json

@app.get("/state/conductividad")
async def currentStateConductividad():
    json = stateConductividad()
    return json

@app.get("/prediction/NPK")
async def currentState(diasAPredecir: Optional[int] = Query(None, description="fecha hasta la cual predecir")):
    if not diasAPredecir:
        return {"error": "Por favor agrega una fecha a predecir en formato 'YYYY-MM-DD'."}
    
    output = predictController(diasAPredecir)
    
    return output

@app.get("/diseases")
async def process_image(image_number: Optional[str] = Query(None, description="Image number")):
=======
@app.get("/disease/fruit/")
async def process_image(image_number: str = Query(..., description="Image number")):
    processed_image = preprocess_image(f'./images/Avocado {image_number}.jpg')
    prediction = model.predict(processed_image)

    states = ["scab", "healthy", "anthracnose"]
    max_index = np.argmax(prediction)
    state = states[max_index]

>>>>>>> 16dd08ec5f6e49e2f027e4cdc73b5ebcab1dfe78
    # Give description of the state
    description = {
        "scab": "Scab is a disease that affects the leaves and fruit of the avocado tree. It is caused by the fungus Elsinoe spp. and is characterized by dark, raised spots on the fruit and leaves.",
        "healthy": "The avocado is healthy and free from any disease.",
<<<<<<< HEAD
        "anthracnose": "Anthracnose is a fungal disease that affects the leaves, fruit, and stems of the avocado tree. It is caused by the fungus Colletotrichum spp. and is characterized by dark, sunken lesions on the fruit and leaves.",
        "asfixiaRadicular": "Asfixia Radicular is a disease that affects the roots of the avocado tree. It is caused by poor drainage and waterlogging of the soil, which leads to a lack of oxygen in the root zone."}

    # Give impact of the state (bajo medio alto)
    impacto = {
        "scab": 2,
        "healthy": 0,
        "anthracnose": 3,
        "asfixiaRadicular": 3
    }

    if image_number:
        stateImagen = tieneEnfermedadFruta(image_number)

    flasAsfixiaRadicular = tieneAsfixiaRadicular()
    output = {}

    if flasAsfixiaRadicular:
        output["asfixiaRadicular"] = {
            "estado": "asfixiaRadicular",
            "descripcion": description["asfixiaRadicular"],
            "impacto": impacto["asfixiaRadicular"],
            "confiabilidad": "x%"
        }
    if image_number:
        output[stateImagen] = {
            "estado": stateImagen,
            "descripcion": description[stateImagen],
            "impacto": impacto[stateImagen],
            "confiabilidad": "75%" if stateImagen else None
        }

    fecha = "2021-10-10"

    return {
        "fecha": fecha,
        "enfermedades": output
    }

=======
        "anthracnose": "Anthracnose is a fungal disease that affects the leaves, fruit, and stems of the avocado tree. It is caused by the fungus Colletotrichum spp. and is characterized by dark, sunken lesions on the fruit and leaves."
    }

    # Give impact of the state
    impacto = {
        "scab": "Scab can reduce the quality and yield of the avocado fruit. It can also weaken the tree and make it more susceptible to other diseases.",
        "healthy": "The avocado is healthy and will produce a good crop of fruit.",
        "anthracnose": "Anthracnose can reduce the quality and yield of the avocado fruit. It can also weaken the tree and make it more susceptible to other diseases."
    }

    return {"from": "fruit",
            "state": state,
            "description": description[state],
            "impact": impacto[state]}
>>>>>>> 16dd08ec5f6e49e2f027e4cdc73b5ebcab1dfe78
