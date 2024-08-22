from fastapi import FastAPI, Query, UploadFile, File, HTTPException
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from fastapi.middleware.cors import CORSMiddleware

import numpy as np
from tensorflow.keras.applications.inception_v3 import preprocess_input
from typing import Optional
from functions import stateController, predictController, tieneAsfixiaRadicular, stateNitrogeno, statePotasio, stateFosforo, statePH, stateHumedad, stateTemperatura, stateConductividad, tieneEnfermedadFruta


app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las solicitudes CORS. Ajusta según sea necesario.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"how to test?": "http://localhost:8000/disease/fruit/{number of image (xxxx)}"}

@app.get("/state")
async def stateHistoricoGeneral(start_date: Optional[str] = Query(None, description="Start date in format YYYY-MM-DD"), end_date: Optional[str] = Query(None, description="End date in format YYYY-MM-DD")):
    if not start_date or not end_date:
        return {"error": "Por favor agrega fecha de inicio y fin para entregar el estado, en formato 'YYYY-MM-DD'."}
    
    nitrogeno, potasio, fosforo, humedad, conductividad, ph, temperatura  = stateController(start_date, end_date)
    
    return {"nitrogeno": nitrogeno, 
            "potasio": potasio, 
            "fosforo": fosforo,
            "humedad": humedad,
            "conductividad": conductividad,
            "ph": ph,
            "temperatura": temperatura
            }

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
    # Give description of the state
    description = {
        "scab": "Scab is a disease that affects the leaves and fruit of the avocado tree. It is caused by the fungus Elsinoe spp. and is characterized by dark, raised spots on the fruit and leaves.",
        "healthy": "The avocado is healthy and free from any disease.",
        "anthracnose": "Anthracnose is a fungal disease that affects the leaves, fruit, and stems of the avocado tree. It is caused by the fungus Colletotrichum spp. and is characterized by dark, sunken lesions on the fruit and leaves.",
        "asfixia radicular": "Asfixia Radicular is a disease that affects the roots of the avocado tree. It is caused by poor drainage and waterlogging of the soil, which leads to a lack of oxygen in the root zone."}

    # Give impact of the state (bajo medio alto)
    impacto = {
        "scab": "medio",
        "healthy": "sin impacto",
        "anthracnose": "alto",
        "asfixia radicular": "alto"
    }

    if image_number:
        stateImagen = tieneEnfermedadFruta(image_number)

    flasAsfixiaRadicular = tieneAsfixiaRadicular()
    output = {}

    if flasAsfixiaRadicular:
        output["asfixia radicular"] = {
            "estado": "asfixia radicular",
            "descripcion": description["asfixia radicular"],
            "impacto": impacto["asfixia radicular"],
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


"""
Revisar parametros necesarios:
- Tipo de riego
- otros (?)
"""
@app.get("/state/hidrico")
async def stateHidrico():

    estado = {"estado": "normal"}

    return estado