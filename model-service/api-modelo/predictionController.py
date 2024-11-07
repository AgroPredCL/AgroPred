from datetime import timedelta, datetime
import pandas as pd
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.inception_v3 import preprocess_input
import joblib
from PIL import Image
import math
import os

import requests

from functions import obtenerAguaDisponible

# Prediccion de estado de nutrientes
## Generar fechas
def generar_fechas(fecha_inicio, cantidadDiasPrediccion):
    # Formato de entrada ajustado
    fecha_inicio = datetime.strptime(fecha_inicio, "%Y-%m-%d")
    fechas = [(fecha_inicio + timedelta(days=i)).strftime("%d-%m-%Y") for i in range(cantidadDiasPrediccion)]
    return fechas

## Se utiliza el modelo para predecir hasta la fecha <fechaPrediccion>
def predictController(nombreCuartel, cantidadDiasPrediccion):
    tiempoInicial = datetime.now()
    # Read data_sensores.csv
    data_sensores = pd.read_csv(f'../modelos/{nombreCuartel}.csv')
    df_copy = data_sensores.copy()

    predicciones = {}
    print("Prediciendo valores de N, F y K...")
    print(os.getcwd())

    model_paths = {
    'model_fit_N': '../modelos/model_fit_N.joblib',
    'model_fit_F': '../modelos/model_fit_F.joblib',
    'model_fit_K': '../modelos/model_fit_K.joblib'
    }
    models = {}

    for name, path in model_paths.items():
        if os.path.exists(path):
            try:
                print(f"Cargando {name}...")
                models[name] = joblib.load(path)
                print(f"{name} cargado exitosamente.")
            except Exception as e:
                print(f"Error al cargar {name}: {e}")
        else:
            print(f"El archivo {path} no existe.")

    for path in model_paths.values():
        if not os.access(path, os.R_OK):
            print(f"No se puede acceder a {path}. Verifica los permisos.")


    #model_fit_N = joblib.load('../modelos/model_fit_N.joblib')
    #model_fit_F = joblib.load('../modelos/model_fit_F.joblib')
    #model_fit_K = joblib.load('../modelos/model_fit_K.joblib')

    print("Modelos cargados...")

    #Prediccion de los modelos
    #nitrogenoPred = model_fit_N.get_forecast(steps=cantidadDiasPrediccion)
    #fosforoPred = model_fit_F.get_forecast(steps=cantidadDiasPrediccion)
    #potasioPred = model_fit_K.get_forecast(steps=cantidadDiasPrediccion)

    nitrogenoPred = models['model_fit_N'].get_forecast(steps=cantidadDiasPrediccion)
    fosforoPred = models['model_fit_F'].get_forecast(steps=cantidadDiasPrediccion)
    potasioPred = models['model_fit_K'].get_forecast(steps=cantidadDiasPrediccion)

    print("Predicciones realizadas...")

    predicciones['Nitrogeno'] = nitrogenoPred
    predicciones['Fosforo'] = fosforoPred
    predicciones['Potasio'] = potasioPred

    df_copy['FechaHora'] = pd.to_datetime(df_copy['FechaHora'])
    df_copy.set_index('FechaHora', inplace=True)

    print("Generando fechas futuras...")

    fecha_base = str(df_copy.index[-1])
    fechas_futuras = generar_fechas(fecha_base[:10], cantidadDiasPrediccion)

    print("Generando valores finales...")

    nitrogenoFinal = [{'fecha': fechas_futuras[i], 'hora': '03:00:00', 'valor': round(predicciones['Nitrogeno'].predicted_mean.tolist()[i], 2)} for i in range(len(fechas_futuras))]
    fosforoFinal = [{'fecha': fechas_futuras[i], 'hora': '03:00:00', 'valor': round(predicciones['Fosforo'].predicted_mean.tolist()[i], 2)} for i in range(len(fechas_futuras))]
    potasioFinal = [{'fecha': fechas_futuras[i], 'hora': '03:00:00', 'valor': round(predicciones['Potasio'].predicted_mean.tolist()[i], 2)} for i in range(len(fechas_futuras))]

    print("Valores finales generados...")

    # Tiempo de ejecucion
    tiempoFinal = datetime.now()

    tiempo = tiempoFinal - tiempoInicial

    print(tiempo.seconds)

    return {"nitrogeno": {"MAPE": "0.6212%", "explicación": "Esto significa que, en promedio, hay una diferencia del 0.6212%. entre el valor real y el predicho.", "predicciones": nitrogenoFinal}, 
            "fosforo":   {"MAPE": "0.4348%", "explicación": "Esto significa que, en promedio, hay una diferencia del 0.4348%. entre el valor real y el predicho.", "predicciones": fosforoFinal},
            "potasio":   {"MAPE": "0.2372%", "explicación": "Esto significa que, en promedio, hay una diferencia del 0.2372%. entre el valor real y el predicho.", "predicciones": potasioFinal}}


# Analisis de enfermedades
## Fruta
model = load_model('../modelos/Avocado_classification_Inception_v1.h5')
def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(128, 128))
    img_array = image.img_to_array(img)
    img_array_expanded_dims = np.expand_dims(img_array, axis=0)
    return preprocess_input(img_array_expanded_dims)

def tieneEnfermedadFruta(image_number):
    processed_image = preprocess_image(f'./images/Avocado {image_number}.jpg')
    prediction = model.predict(processed_image)

    states = ["scab", "healthy", "anthracnose", "asfixia radicular"]
    max_index = np.argmax(prediction)
    stateImagen = states[max_index]
    return stateImagen

## NPK
def check_asfixia_radicular(ph, temperature, humidity):
    if 5 < ph < 8 and 13 < temperature < 32 and 80 < humidity < 100:
        return True
    return False

def tieneAsfixiaRadicular(nombreCuartel):
    # Leer data_sensores.csv
    data_sensores = pd.read_csv(f'../modelos/{nombreCuartel}.csv')

    # Convertir mg/kg a kg/ha cada uno de los datos en las columnas de 'N', 'P' y 'K'
    ph = data_sensores['pH']
    temperatura = data_sensores['Temperatura']
    humedad = data_sensores['Humedad']

    # Considerando el ultimo 25% de los datos, si la mayoria es True, se considera que hay asfixia radicular
    valuesAsfixia = [check_asfixia_radicular(ph[i], temperatura[i], humedad[i]) for i in range(int(len(ph)*0.75), len(ph))]

    # Si la mayoria de valores en valuesAsfixia es True, entonces se considera que tiene asfixia radicular
    if valuesAsfixia.count(True) > len(valuesAsfixia) * 0.5:
        return False

    return True

def obtenerDatosCuartel(cuartelID):
    url = f"http://api-backend:3000/cuartel/{cuartelID}" 
    response = requests.get(url)

    print(response)

    if response.status_code == 200:
        return response.json()
    else:
        print("Error al obtener los datos del cuartel:", response.status_code, response.text)
        return None

def predecirEstadoHidrico(cuartelID, cantidadDeDias):
    print(cuartelID, cantidadDeDias)

    # Obtener los datos del cuartel
    cuartel = obtenerDatosCuartel(cuartelID)

    if not cuartel:
        return None  # Si no se obtuvieron datos, salir de la función

    # Llenar las variables con los datos obtenidos del cuartel
    factorAreaSombreada = cuartel.get('factor_area_sombreada')  # Valor obtenido de la API
    eficienciaRiego = cuartel.get('eficiencia_riego')  # Valor obtenido de la API
    marcoM2Plantacion = cuartel.get('marco_plantacion')  # Valor obtenido de la API
    caudalEmisor = cuartel.get('caudal_emisor')  # Valor obtenido de la API
    numEmisoresPlanta = cuartel.get('numero_emisores_planta')  # Valor obtenido de la API
    coeficienteUniformidad = cuartel.get('coeficiente_uniformidad')  # Valor obtenido de la API
    retencionAguaSuelo = cuartel.get('retencion_agua_suelo')  # Valor obtenido de la API
    profundidadRaices = cuartel.get('profundidad_raices')  # Valor obtenido de la API
    umbralRiego = cuartel.get('umbral_riego')  # Valor obtenido de la API
    porcentajeSueloEmisores = cuartel.get('porcentaje_suelo_emisores')  # Valor obtenido de la API
    piedrasPerfilSuelo = cuartel.get('piedras_perfil_suelo')  # Valor obtenido de la API

    # -------------------------------------------------------------------------------------------------- #
    # Calculo de: Evapotranspiracion potencial
    kp = 0.45 # considerando "sobre barbecho seco", "viento moderado 175 - 425" y "distancia 1metro"
    eb = 45.5 # para la cruz durante AGOSTO en promedio entre los años 1993 y 1999
    eto = kp * eb
    
    # Calculo de: EvoTranspiracion del cultivo
    kc = 0.72 # considerando paltos en SETIEMBRE
    kr = factorAreaSombreada
    etc = eto * kc * kr
    
    # Calculo de: Demanda bruta de agua del cultivo
    efa = eficienciaRiego # considera microaspercion
    efa = 0.85
    db = etc / efa

    # Calculo de: Requerimiento de agua por planta (litros de agua por planta, por dia)
    rap = db * marcoM2Plantacion
    # -------------------------------------------------------------------------------------------------- #
    
    # -----------------------------------------RIEGOS DIARIOS------------------------------------------- #
    # Calculo de: Caudal de agua aplicado a cada planta
    qpl = caudalEmisor * numEmisoresPlanta * coeficienteUniformidad

    # Calculo de: Intensidad de precipitacion del equipo 
    ipp = qpl * marcoM2Plantacion

    # Calculo de: Tiempo de riego
    #tr = db / ipp
    tr = rap / qpl
    # -------------------------------------------------------------------------------------------------- #

    # -------------------------------------RIEGOS BAJA FRECUENCIA--------------------------------------- #
    # Calculo de: Agua disponible que las plantas pueden agotar desde el suelo, antes de volver a regar
    ad = retencionAguaSuelo * profundidadRaices * umbralRiego * porcentajeSueloEmisores * (1 - piedrasPerfilSuelo)

    # Calculo de: Frecuencia de riego en dias
    fr = ad / etc
    # -------------------------------------------------------------------------------------------------- #

    """
    # Calculo de recomendaciones riego diario
    # Considerando que de alguna forma se obtienen los datos meteorologicos de la zona para 7 dias
    semana = {"dia 0": False,
              "dia 1": False,
              "dia 2": True,
              "dia 3": False,
              "dia 4": False,
              "dia 5": False,
              "dia 6": False}
    
    # Recomendacio de si regar o no
    recomendacionRiegoDiario = {}
    for dia in semana:
        if not semana[dia]:
            recomendacionRiegoDiario[dia] = "Regar"
        else:
            recomendacionRiegoDiario[dia] = "No regar"

    # Calculo de recomendaciones de riego de baja frecuencia
    # Considerando que regue hoy domingo y los valores de semana son de la siguiente semana, calculo cuando regar de acuerdo a fr
    frReal = fr
    frRedondeado = math.ceil(fr)
    recomendacionRiegoBajaFrecuencia = {}
    diasSinRegar = []
    # Obtener los días en los que se debe regar según la frecuencia
    for i in range(7):
        if i % frRedondeado == 0:
            diasSinRegar.append(i)

    # Ajustar según días de lluvia
    diasDeLluvia = [i for i, llueve in semana.items() if llueve]

    # Crear un nuevo listado de días en los que se recomienda regar ajustando por lluvia
    ajusteDiasSinRegar = []
    for dia in diasSinRegar:
        if dia in diasDeLluvia:
            # Si el día de riego coincide con un día de lluvia, añadir un día extra
            ajusteDiasSinRegar.append(dia + 1)
        else:
            ajusteDiasSinRegar.append(dia)
    
    # Aplicar recomendaciones de riego
    for i in range(7):
        if i in ajusteDiasSinRegar:
            recomendacionRiegoBajaFrecuencia[f"dia {i}"] = "Regar"
        else:
            recomendacionRiegoBajaFrecuencia[f"dia {i}"] = "No regar"

    response = {
        "riegosDiarios": {
            "horasDeRiegoDiario": tr,
            "recomendacionRiegoDiario": recomendacionRiegoDiario 
        },
        "riegosBajaFrecuencia": {
            "frecuenciaDeRiegoEnDias": fr,
            "recomendacionRiegoBajaFrecuencia": recomendacionRiegoBajaFrecuencia
        }
    }
    """

    adNew = 100
    rapNew = 8

    aguaDisponible = obtenerAguaDisponible(adNew, rapNew, cantidadDeDias)

    
    return aguaDisponible

