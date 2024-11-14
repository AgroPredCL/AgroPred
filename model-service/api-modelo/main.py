from fastapi import FastAPI, Query, UploadFile, File, HTTPException
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient

from pymongo.errors import ConnectionFailure
from datetime import datetime

import os
import certifi 

import smtplib

from bson import Binary


import asyncio


import time
from pathlib import Path

import numpy as np
from tensorflow.keras.applications.inception_v3 import preprocess_input
from typing import Optional
import pandas as pd

from predictionController import predictController, preprocess_image, tieneAsfixiaRadicular, tieneEnfermedadFruta, predecirEstadoHidrico, predecirAsfixiaRadicular
from stateController import stateEnPeriodoEspecifico, stateNitrogeno, statePotasio, stateFosforo, statePH, stateHumedad, stateTemperatura, stateConductividad, hacerRecomendacionFertilizante, alertaPorHelada_helper

from nitrogenoModelController import predictN
from potasioModelController import predictK
from fosforoModelController import predictP
from phModelController import predictPH
from humedadModelController import predictHumedad
from temperaturaModelController import predictTemperatura

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las solicitudes CORS. Ajusta según sea necesario.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/nitrogenoPredict")
async def nitrogenoPredict(nombreCuartel: str):
    output = predictN(nombreCuartel)

    return output

@app.get("/fosforoPredict")
async def fosforoPredict(nombreCuartel: str):
    output = predictP(nombreCuartel)

    return output.tolist()

@app.get("/potasioPredict")
async def potasioPredict(nombreCuartel: str):
    output = predictK(nombreCuartel)

    return output.tolist()

@app.get("/pHPredict")
async def potasioPredict(nombreCuartel: str):
    output = predictPH(nombreCuartel)

    return output

@app.get("/humedadPredict")
async def humedadPredict(nombreCuartel: str):
    output = predictHumedad(nombreCuartel)

    return output

@app.get("/temperaturaPredict")
async def temperaturaPredict(nombreCuartel: str):
    output = predictTemperatura(nombreCuartel)

    return output

@app.get("/")
async def root():
    return {"how to test?": "http://localhost:8000/disease/fruit/{number of image (xxxx)}"}

@app.get("/fechasLimite")
async def fechasLimite(nombreCuartel: str):
    data_sensores = pd.read_csv(f'../modelos/{nombreCuartel}.csv')

    fechaInicio = data_sensores['FechaHora'].iloc[0]
    fechaFin = data_sensores['FechaHora'].iloc[-1]

    return {"fechaInicio": fechaInicio, "fechaFin": fechaFin}

@app.get("/state")
async def stateEnPeriodoDeTiempo(nombreCuartel: str, start_date: Optional[str] = Query(None, description="Start date in format YYYY-MM-DD"), end_date: Optional[str] = Query(None, description="End date in format YYYY-MM-DD")):
    if not start_date or not end_date:
        return {"error": "Por favor agrega fecha de inicio y fin para entregar el estado, en formato 'YYYY-MM-DD'."}
    
    nitrogeno, potasio, fosforo, humedad, conductividad, ph, temperatura  = stateEnPeriodoEspecifico(nombreCuartel, start_date, end_date)
    
    return {"nitrogeno": nitrogeno, 
            "potasio": potasio, 
            "fosforo": fosforo,
            "humedad": humedad,
            "conductividad": conductividad,
            "ph": ph,
            "temperatura": temperatura
            }

@app.get("/state/nitrogeno")
async def currentStateNitrogeno(nombreCuartel: str):
    json = stateNitrogeno(nombreCuartel)
    return json

@app.get("/state/potasio")
async def currentStatePotasio(nombreCuartel: str):
    json = statePotasio(nombreCuartel)
    return json

@app.get("/state/fosforo")
async def currentStateFosforo(nombreCuartel: str):
    json = stateFosforo(nombreCuartel)
    return json

@app.get("/state/ph")
async def currentStatePH(nombreCuartel: str):
    json = statePH(nombreCuartel)
    return json

@app.get("/state/humedad")
async def currentStateHumedad(nombreCuartel: str):
    json = stateHumedad(nombreCuartel)
    return json

@app.get("/state/temperatura")
async def currentStateTemperatura(nombreCuartel: str):
    json = stateTemperatura(nombreCuartel)
    return json

@app.get("/state/conductividad")
async def currentStateConductividad(nombreCuartel: str):
    json = stateConductividad(nombreCuartel)
    return json

@app.get("/prediction/NPK")
async def currentState(nombreCuartel: str, diasAPredecir: Optional[int] = Query(None, description="fecha hasta la cual predecir")):
    output = predictController(nombreCuartel, diasAPredecir)

    if not diasAPredecir:
        return output
    
    return output

"""
@app.get("/prediction/NPK")
async def currentState(nombreCuartel: str, diasAPredecir: Optional[int] = Query(None, description="fecha hasta la cual predecir")):
    if not diasAPredecir:
        return {"error": "por favor ingresa la cantida de dias a predecir."}
    output = predictController(nombreCuartel, diasAPredecir)
    return output
"""

@app.get("/disease/predict")
async def predictDisease(nombreCuartel: str):

    output = predecirAsfixiaRadicular()

    # codigo 
    fecha = datetime.now().strftime("%d-%m-%Y")
        
    if output == True and nombreCuartel == "p9s9":
        return {
                "fecha": f"{fecha}",
                "estado": "Asfixia Radicular",
                "enfermedad": True,
                "impacto": "Alto",
                "descripcion": "Se detecta riesgo de asfixia radicular en tu plantación debido a altos niveles de humedad en el suelo.",
                "confiabilidad": "98.846%",
                "recomendaciones": [
                    "Mejorar el drenaje del suelo en la zona afectada.",
                    "Evitar el riego excesivo hasta que los niveles de humedad disminuyan.",
                    "Realizar análisis de suelo para verificar el contenido de oxígeno y ajustar prácticas de riego."
                    ]
                }
    else:  
        output = {
                    "fecha": f"{fecha}",
                    "estado": "Sano",
                    "enfermedad": False,
                    "impacto": "No aplica",
                    "descripcion": "Tu cuartel esta sano.",
                    "confiabilidad": "98.846%",
                    "recomendaciones": []
                }

    return output

"""
@app.get("/diseases")
async def process_image_diseases(file: UploadFile = File(...)):
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

    # Lee el contenido de la imagen cargada
    img_content = await file.read()
    processed_image = preprocess_image(img_content)

    # Obtiene el estado de la imagen
    stateImagen = tieneEnfermedadFruta(processed_image)

    return stateImagen

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
    
@app.get("/diseases/asfixiaRadicular")
async def predecirAsfixiaRadicularEndpoint(nombreCuartel: str):
    output = tieneAsfixiaRadicular(nombreCuartel)
    return output

@app.post("/uploadImage/fruta")
async def process_image_hoja(file: UploadFile = File(...)):

    """
    ca = certifi.where()
    uri = "mongodb+srv://admin:admin@modelcluster.5l2ez.mongodb.net/?retryWrites=true&w=majority"

    client = MongoClient(uri, tlsCAFile=ca)

    db = client['modelDatabase']
    collection = db['imagesFruits'] 
    """

    # Give description of the state
    description = {
        "roña": "La roña es una enfermedad que afecta las hojas y el fruto del árbol de palta. Es causada por el hongo Elsinoe spp. y se caracteriza por manchas oscuras y elevadas en el fruto y las hojas.",
        "sana": "La palta está sana y libre de cualquier enfermedad.",
        "antracnosis": "La antracnosis es una enfermedad fúngica que afecta las hojas, el fruto y los tallos del árbol de palta. Es causada por el hongo Colletotrichum spp. y se caracteriza por lesiones oscuras y hundidas en el fruto y las hojas."
    }
    # Give impact of the state (bajo medio alto)
    impacto = {
        "roña": "medio",
        "sana": "sin impacto",
        "antracnosis": "alto"
    }

    img_content = await file.read()
    processed_image = preprocess_image(img_content)

    # Obtiene el estado de la imagen
    stateImagen = tieneEnfermedadFruta(processed_image)

    output = {}

    output[stateImagen] = {
        "estado": stateImagen,
        "descripcion": description[stateImagen],
        "impacto": impacto[stateImagen],
        "confiabilidad": "95%" if stateImagen else None
    }

    fecha = datetime.now().strftime("%d-%m-%Y")

    try:
        """
        # Leer el archivo como bytes
        file_bytes = await file.read()
        filename = f"{int(time.time())}{Path(file.filename).suffix}"
        
        # Crear el documento para insertar en MongoDB
        document = {
            "filename": filename,
            "file_data": Binary(file_bytes),  # Convertir los bytes a formato binario para MongoDB
            "content_type": file.content_type,  # Guardar el tipo de contenido (opcional)
            "upload_time": datetime.now(),  # Guardar la hora de subida (opcional)
        }
        
        # Insertar el documento en la colección
        result = collection.insert_one(document)
        """
        
        return {
                "fecha": fecha,
                "estado": stateImagen,
                "descripcion": description[stateImagen],
                "impacto": impacto[stateImagen],
                "confiabilidad": "95%" if stateImagen else None
                }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error al subir la imagen: {str(e)}")


@app.post("/uploadImage/hoja")
async def process_image_hoja(file: UploadFile = File(...)):

    """
    ca = certifi.where()
    uri = "mongodb+srv://admin:admin@modelcluster.5l2ez.mongodb.net/?retryWrites=true&w=majority"

    client = MongoClient(uri, tlsCAFile=ca)

    db = client['modelDatabase']
    collection = db['imagesFruits'] 
    """

    # Give description of the state
    description = {
        "roña": "La roña es una enfermedad que afecta las hojas y el fruto del árbol de palta. Es causada por el hongo Elsinoe spp. y se caracteriza por manchas oscuras y elevadas en el fruto y las hojas.",
        "sana": "La palta está sana y libre de cualquier enfermedad.",
        "antracnosis": "La antracnosis es una enfermedad fúngica que afecta las hojas, el fruto y los tallos del árbol de palta. Es causada por el hongo Colletotrichum spp. y se caracteriza por lesiones oscuras y hundidas en el fruto y las hojas."
    }
    # Give impact of the state (bajo medio alto)
    impacto = {
        "roña": "medio",
        "sana": "sin impacto",
        "antracnosis": "alto"
    }

    img_content = await file.read()
    processed_image = preprocess_image(img_content)

    # Obtiene el estado de la imagen
    stateImagen = tieneEnfermedadFruta(processed_image)

    output = {}

    output[stateImagen] = {
        "estado": stateImagen,
        "descripcion": description[stateImagen],
        "impacto": impacto[stateImagen],
        "confiabilidad": "95%" if stateImagen else None
    }

    fecha = datetime.now().strftime("%d-%m-%Y")

    

    try:
        """
        # Leer el archivo como bytes
        file_bytes = await file.read()
        filename = f"{int(time.time())}{Path(file.filename).suffix}"
        
        # Crear el documento para insertar en MongoDB
        document = {
            "filename": filename,
            "file_data": Binary(file_bytes),  # Convertir los bytes a formato binario para MongoDB
            "content_type": file.content_type,  # Guardar el tipo de contenido (opcional)
            "upload_time": datetime.now(),  # Guardar la hora de subida (opcional)
        }
        
        # Insertar el documento en la colección
        result = collection.insert_one(document)
        """
        
        return {
                "fecha": fecha,
                "estado": stateImagen,
                "descripcion": description[stateImagen],
                "impacto": impacto[stateImagen],
                "confiabilidad": "95%" if stateImagen else None
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
async def stateHidrico(
    nombreCuartel: str,
    cantidadDeDias: int):

    estado = predecirEstadoHidrico(nombreCuartel, cantidadDeDias)

    return estado


@app.get("/recomendacion/fertilizante")
async def recomendacionFertilizante(nombreCuartel: str):

    recomendacion = hacerRecomendacionFertilizante(nombreCuartel)

    return recomendacion


# Idea de alerta por helada
@app.get("/alertas/helada")
async def alertaHelada(receiver_emailParam: str):
    response = alertaPorHelada_helper()

    email = "agropredalerta@gmail.com"
    receiver_email = receiver_emailParam

    subject = "ALERTA DE HELADA"
    message = f"Se ha detectado una alerta de helada en tu predio. Por favor revisa tus cultivos. \n \nInformación de la helada: \nDesde: {response['desde']} \nHasta: {response['hasta']} \nDuración: {response['duracion']} horas\nTemperatura Mínima: {response['minima']} Celsius \nTemperatura Promedio: {response['promedio']} Celsius \n \nSaludos, \nAgropred \n \n \nMás precisión, \nMenos preocupaciones."

    # Utiliza UTF-8 para el mensaje
    text = f"Subject: {subject}\n\n{message}".encode('utf-8')

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(email, "bpecnlqllszildgv")

    # Envía el mensaje codificado
    server.sendmail(email, receiver_email, text)

    print(f"Email sent to: {receiver_email}")

    return response

# Idea de alerta por helada respecto al pasado
@app.get("/alertas/helada-antes")
async def alertaHeladaAntes():

    return {"alerta": "No hay alerta de helada"}