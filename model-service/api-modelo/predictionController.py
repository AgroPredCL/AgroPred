from datetime import timedelta, datetime
import pandas as pd
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.inception_v3 import preprocess_input
import joblib
from PIL import Image
import math


# Prediccion de estado de nutrientes
## Generar fechas
def generar_fechas(fecha_inicio, n_dias):
    fecha_inicio = datetime.strptime(fecha_inicio, "%Y-%m-%d")
    fechas_futuras = [(fecha_inicio + timedelta(days=i)).strftime("%Y-%m-%d") for i in range(n_dias)]
    return fechas_futuras

## Se utiliza el modelo para predecir hasta la fecha <fechaPrediccion>
def predictController(cantidadDiasPrediccion):
    tiempoInicial = datetime.now()
    # Read data_sensores.csv
    data_sensores = pd.read_csv('../modelos/data_sensores.csv')
    df_copy = data_sensores.copy()

    predicciones = {}

    model_fit_N = joblib.load('../modelos/model_fit_N.joblib')
    model_fit_F = joblib.load('../modelos/model_fit_F.joblib')
    model_fit_K = joblib.load('../modelos/model_fit_K.joblib')

    #Prediccion de los modelos
    nitrogenoPred = model_fit_N.get_forecast(steps=cantidadDiasPrediccion)
    fosforoPred = model_fit_F.get_forecast(steps=cantidadDiasPrediccion)
    potasioPred = model_fit_K.get_forecast(steps=cantidadDiasPrediccion)

    predicciones['Nitrogeno'] = nitrogenoPred
    predicciones['Fosforo'] = fosforoPred
    predicciones['Potasio'] = potasioPred

    df_copy['FechaHora'] = pd.to_datetime(df_copy['FechaHora'])
    df_copy.set_index('FechaHora', inplace=True)

    fecha_base = str(df_copy.index[-1])
    fechas_futuras = generar_fechas(fecha_base[:10], cantidadDiasPrediccion)

    nitrogenoFinal = [{'fecha': fechas_futuras[i], 'valor': round(predicciones['Nitrogeno'].predicted_mean.tolist()[i], 2)} for i in range(len(fechas_futuras))]
    fosforoFinal = [{'fecha': fechas_futuras[i], 'valor': round(predicciones['Fosforo'].predicted_mean.tolist()[i], 2)} for i in range(len(fechas_futuras))]
    potasioFinal = [{'fecha': fechas_futuras[i], 'valor': round(predicciones['Potasio'].predicted_mean.tolist()[i], 2)} for i in range(len(fechas_futuras))]

    # Tiempo de ejecucion
    tiempoFinal = datetime.now()

    tiempo = tiempoFinal - tiempoInicial

    print(tiempo.seconds)

    return {"nitrogeno": {"RMSE": 6.02,"predicciones": nitrogenoFinal}, 
            "fosforo": {"RMSE": 1.48, "predicciones": fosforoFinal},
            "potasio": {"RMSE": 14.78, "predicciones": potasioFinal}}


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

def tieneAsfixiaRadicular():
    # Leer data_sensores.csv
    data_sensores = pd.read_csv('../modelos/data_sensores.csv')

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





def predecirEstadoHidrico(
    factorAreaSombreada, 
    eficienciaRiego,
    marcoM2Plantacion,
    caudalEmisor,
    numEmisoresPlanta,
    coeficienteUniformidad,
    retencionAguaSuelo,
    profundidadRaices,
    umbralRiego,
    porcentajeSueloEmisores, 
    piedrasPerfilSuelo):

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
    
    return response

