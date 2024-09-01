from fastapi import FastAPI, Query, UploadFile, File, HTTPException
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient

from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from datetime import datetime

import os
import certifi 


from bson import Binary


import asyncio


import time
from pathlib import Path

import numpy as np
from tensorflow.keras.applications.inception_v3 import preprocess_input
from typing import Optional
import pandas as pd

from predictionController import predictController, tieneAsfixiaRadicular, tieneEnfermedadFruta, predecirAsfixiaRadicular
from stateController import stateEnPeriodoEspecifico, stateNitrogeno, statePotasio, stateFosforo, statePH, stateHumedad, stateTemperatura, stateConductividad

app = FastAPI()

ca = certifi.where()
uri = "mongodb+srv://admin:admin@modelcluster.5l2ez.mongodb.net/?retryWrites=true&w=majority"

# Crear un cliente MongoClient
client = MongoClient(uri, tlsCAFile=ca)



db = client['modelDatabase']  # Reemplaza con el nombre de tu base de datos
collection = db['imagesFruits']  # Reemplaza con el nombre de tu colección




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

@app.get("/fechasLimite")
async def fechasLimite():
    data_sensores = pd.read_csv('../modelos/data_sensores.csv')

    fechaInicio = data_sensores['FechaHora'].iloc[0]
    fechaFin = data_sensores['FechaHora'].iloc[-1]

    print(fechaInicio, fechaFin)

    return {"fechaInicio": fechaInicio, "fechaFin": fechaFin}

@app.get("/state")
async def stateEnPeriodoDeTiempo(start_date: Optional[str] = Query(None, description="Start date in format YYYY-MM-DD"), end_date: Optional[str] = Query(None, description="End date in format YYYY-MM-DD")):
    if not start_date or not end_date:
        return {"error": "Por favor agrega fecha de inicio y fin para entregar el estado, en formato 'YYYY-MM-DD'."}
    
    nitrogeno, potasio, fosforo, humedad, conductividad, ph, temperatura  = stateEnPeriodoEspecifico(start_date, end_date)
    
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
        return {"error": "por favor ingresa la cantida de dias a predecir."}
    output = predictController(diasAPredecir)
    return output

@app.get("/diseases")
async def process_image_diseases(image_number: Optional[str] = Query(None, description="Image number")):
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

@app.get("/diseases/asfixiaRadicular")
async def predecirAsfixiaRadicularEndpoint():
    output = predecirAsfixiaRadicular()
    return output

@app.post("/uploadImage/fruta")
async def process_image_hoja(file: UploadFile = File(...), image_number: str | None = None):

    ca = certifi.where()
    uri = "mongodb+srv://admin:admin@modelcluster.5l2ez.mongodb.net/?retryWrites=true&w=majority"

    client = MongoClient(uri, tlsCAFile=ca)

    db = client['modelDatabase']
    collection = db['imagesFruits'] 

    if not image_number:
        image_number = "0005"

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

    output[stateImagen] = {
        "estado": stateImagen,
        "descripcion": description[stateImagen],
        "impacto": impacto[stateImagen],
        "confiabilidad": "75%" if stateImagen else None
    }

    fecha = "2021-10-10"

    try:
        # Leer el archivo como bytes
        file_bytes = await file.read()
        filename = f"{int(time.time())}{Path(file.filename).suffix}"
        
        # Crear el documento para insertar en MongoDB
        document = {
            "filename": filename,
            "file_data": Binary(file_bytes),  # Convertir los bytes a formato binario para MongoDB
            "content_type": file.content_type,  # Guardar el tipo de contenido (opcional)
            "upload_time": time.time(),  # Guardar la hora de subida (opcional)
            "queso":"eso",
        }
        
        # Insertar el documento en la colección
        result = collection.insert_one(document)
        
        return {
                "fecha": fecha,
                "enfermedades": output
                }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error al subir la imagen: {str(e)}")


@app.post("/uploadImage/hoja")
async def process_image_hoja(file: UploadFile = File(...), image_number: str | None = None):

    ca = certifi.where()
    uri = "mongodb+srv://admin:admin@modelcluster.5l2ez.mongodb.net/?retryWrites=true&w=majority"

    client = MongoClient(uri, tlsCAFile=ca)

    db = client['modelDatabase']
    collection = db['imagesLeafs'] 

    if not image_number:
        image_number = "0005"

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

    output[stateImagen] = {
        "estado": stateImagen,
        "descripcion": description[stateImagen],
        "impacto": impacto[stateImagen],
        "confiabilidad": "75%" if stateImagen else None
    }

    fecha = "2021-10-10"

    try:
        # Leer el archivo como bytes
        file_bytes = await file.read()
        filename = f"{int(time.time())}{Path(file.filename).suffix}"
        
        # Crear el documento para insertar en MongoDB
        document = {
            "filename": filename,
            "file_data": Binary(file_bytes),  # Convertir los bytes a formato binario para MongoDB
            "content_type": file.content_type,  # Guardar el tipo de contenido (opcional)
            "upload_time": time.time(),  # Guardar la hora de subida (opcional)
            "queso":"eso",
        }
        
        # Insertar el documento en la colección
        result = collection.insert_one(document)
        
        return {
                "fecha": fecha,
                "enfermedades": output
                }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error al subir la imagen: {str(e)}")


"""
Revisar parametros necesarios:
- Kr: float
- Tipo de riego: string
- Tipo de suelo: 
"""
@app.get("/state/hidrico")
async def stateHidrico():

    estado = {"estado": "normal"}

    return estado