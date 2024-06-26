from datetime import timedelta, datetime
import pandas as pd
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.inception_v3 import preprocess_input
import joblib
from PIL import Image

# Estado actual general historico y estados actuales de cada valor
def stateController(startDate, endDate):
    # Read data_sensores.csv
    data_sensores = pd.read_csv('../modelos/data_sensores.csv')
    
    # Obtener los datos desde y hasta las fecha dadas (considera los primeros 10 caracteres para comparar)
    #DESDE
    for i in range(len(data_sensores)):
        if data_sensores['FechaHora'][i][:10] == startDate:
            desde = i
            break
    #HASTA
    for i in range(len(data_sensores)):
        if data_sensores['FechaHora'][i][:10] == endDate:
            hasta = i
            break

    # Obtener los valores de los sensores (+3 por que son 3 mediciones por dia y asi se cuenta el dia completo para HASTA)
    nitrogeno = data_sensores['Nitrogeno'][desde:hasta+3]
    potasio = data_sensores['Potasio'][desde:hasta+3]
    fosforo = data_sensores['Fosforo'][desde:hasta+3]
    humedad = data_sensores['Humedad'][desde:hasta+3]
    conductividad = data_sensores['Conductividad_Electrica'][desde:hasta+3]
    ph = data_sensores['pH'][desde:hasta+3]
    temperatura = data_sensores['Temperatura'][desde:hasta+3]

    fechas = data_sensores['FechaHora'][desde:hasta+3]

    # Hacer tuplas de fecha y valor de cada sensor (en formato JSON)
    nitrogeno = [{'fecha': fechas[i][:10], 'hora': fechas[i][11:], 'valor': round(nitrogeno[i], 2)} for i in range(len(nitrogeno))]
    potasio = [{'fecha': fechas[i][:10], 'hora': fechas[i][11:], 'valor': round(potasio[i])} for i in range(len(potasio))]
    fosforo = [{'fecha': fechas[i][:10], 'hora': fechas[i][11:], 'valor': round(fosforo[i])} for i in range(len(fosforo))]
    humedad = [{'fecha': fechas[i][:10], 'hora': fechas[i][11:], 'valor': round(humedad[i])} for i in range(len(humedad))]
    conductividad = [{'fecha': fechas[i][:10], 'hora': fechas[i][11:], 'valor': round(conductividad[i])} for i in range(len(conductividad))]
    ph = [{'fecha': fechas[i][:10], 'hora': fechas[i][11:], 'valor': round(ph[i])} for i in range(len(ph))]
    temperatura = [{'fecha': fechas[i][:10], 'hora': fechas[i][11:], 'valor': round(temperatura[i])} for i in range(len(temperatura))]


    return nitrogeno, potasio, fosforo, humedad, conductividad, ph, temperatura
def stateNitrogeno():
    data_sensores = pd.read_csv('../modelos/data_sensores.csv')
    valorActual = data_sensores['Nitrogeno'].iloc[-1]

    if valorActual < 100:
        estadoActual = "Deficiente"
    elif 90 <= valorActual < 100:
        estadoActual = "Bajo"
    elif 100 <= valorActual < 120:
        estadoActual = "Adecuado"
    elif 120 <= valorActual < 180:
        estadoActual = "Alto"
    else:
        estadoActual = "Excesivo"

    valorPromedio = data_sensores['Nitrogeno'].mean()
    if valorPromedio < 100:
        estadoPromedio = "Deficiente"
    elif 90 <= valorPromedio < 100:
        estadoPromedio = "Bajo"
    elif 100 <= valorPromedio < 120:
        estadoPromedio = "Adecuado"
    elif 120 <= valorPromedio < 180:
        estadoPromedio = "Alto"
    else:
        estadoPromedio = "Excesivo"

    return {"estadoActual": estadoActual , "valorActual": round(valorActual, 2), "estadoPromedio": estadoPromedio, "valorPromedio": round(valorPromedio, 2)}
def statePotasio():
    data_sensores = pd.read_csv('../modelos/data_sensores.csv')
    valorActual = data_sensores['Potasio'].iloc[-1]

    if valorActual < 145:
        estadoActual = "Deficiente"
    elif 145 <= valorActual < 150:
        estadoActual = "Bajo"
    elif 150 <= valorActual < 155:
        estadoActual = "Adecuado"
    elif 155 <= valorActual < 160:
        estadoActual = "Alto"
    else:
        estadoActual = "Excesivo"

    valorPromedio = data_sensores['Potasio'].mean()
    if valorPromedio < 145:
        estadoPromedio = "Deficiente"
    elif 145 <= valorPromedio < 150:
        estadoPromedio = "Bajo"
    elif 150 <= valorPromedio < 155:
        estadoPromedio = "Adecuado"
    elif 155 <= valorPromedio < 160:
        estadoPromedio = "Alto"
    else:
        estadoPromedio = "Excesivo"

    return {"estadoActual": estadoActual , "valorActual": round(valorActual, 2), "estadoPromedio": estadoPromedio, "valorPromedio": round(valorPromedio, 2)}
def stateFosforo():
    data_sensores = pd.read_csv('../modelos/data_sensores.csv')
    valorActual = data_sensores['Fosforo'].iloc[-1]

    if valorActual < 40:
        estadoActual = "Deficiente"
    elif 40 <= valorActual < 45:
        estadoActual = "Bajo"
    elif 45 <= valorActual < 50:
        estadoActual = "Adecuado"
    elif 50 <= valorActual < 60:
        estadoActual = "Alto"
    else:
        estadoActual = "Excesivo"

    valorPromedio = data_sensores['Fosforo'].mean()
    if valorPromedio < 40:
        estadoPromedio = "Deficiente"
    elif 40 <= valorPromedio < 45:
        estadoPromedio = "Bajo"
    elif 45 <= valorPromedio < 50:
        estadoPromedio = "Adecuado"
    elif 50 <= valorPromedio < 60:
        estadoPromedio = "Alto"
    else:
        estadoPromedio = "Excesivo"

    return {"estadoActual": estadoActual , "valorActual": round(valorActual, 2), "estadoPromedio": estadoPromedio, "valorPromedio": round(valorPromedio, 2)}
def stateConductividad():
    data_sensores = pd.read_csv('../modelos/data_sensores.csv')
    valorActual = data_sensores['Conductividad_Electrica'].iloc[-1]

    if valorActual < 23:
        estadoActual = "Deficiente"
    elif 23 <= valorActual < 24:
        estadoActual = "Bajo"
    elif 24 <= valorActual < 25:
        estadoActual = "Adecuado"
    elif 25 <= valorActual < 26:
        estadoActual = "Alto"
    else:
        estadoActual = "Excesivo"

    valorPromedio = data_sensores['Conductividad_Electrica'].mean()
    if valorPromedio < 23:
        estadoPromedio = "Deficiente"
    elif 23 <= valorPromedio < 24:
        estadoPromedio = "Bajo"
    elif 24 <= valorPromedio < 25:
        estadoPromedio = "Adecuado"
    elif 25 <= valorPromedio < 26:
        estadoPromedio = "Alto"
    else:
        estadoPromedio = "Excesivo"

    return {"estadoActual": estadoActual , "valorActual": round(valorActual, 2), "estadoPromedio": estadoPromedio, "valorPromedio": round(valorPromedio, 2)}
def statePH():
    data_sensores = pd.read_csv('../modelos/data_sensores.csv')
    valorActual = data_sensores['pH'].iloc[-1]

    if valorActual < 4.5:
        estadoActual = "Deficiente"
    elif 4.5 <= valorActual < 5.5:
        estadoActual = "Bajo"
    elif 5.5 <= valorActual < 6.8:
        estadoActual = "Adecuado"
    elif 6.8 <= valorActual:
        estadoActual = "Alto"
    else:
        estadoActual = "Excesivo"

    valorPromedio = data_sensores['pH'].mean()
    if valorPromedio < 4.5:
        estadoPromedio = "Deficiente"
    elif 4.5 <= valorPromedio < 5.5:
        estadoPromedio = "Bajo"
    elif 5.5 <= valorPromedio < 6.5:
        estadoPromedio = "Adecuado"
    elif 6.5 <= valorPromedio:
        estadoPromedio = "Alto"
    else:
        estadoPromedio = "Excesivo"

    return {"estadoActual": estadoActual , "valorActual": round(valorActual, 2), "estadoPromedio": estadoPromedio, "valorPromedio": round(valorPromedio, 2)}
def stateHumedad():
    data_sensores = pd.read_csv('../modelos/data_sensores.csv')
    valorActual = data_sensores['Humedad'].iloc[-1]

    if valorActual < 20:
        estadoActual = "Deficiente"
    elif 20 <= valorActual < 30:
        estadoActual = "Bajo"
    elif 30 <= valorActual < 60:
        estadoActual = "Adecuado"
    elif 60 <= valorActual < 80:
        estadoActual = "Alto"
    else:
        estadoActual = "Excesivo"

    valorPromedio = data_sensores['Humedad'].mean()
    if valorPromedio < 20:
        estadoPromedio = "Deficiente"
    elif 20 <= valorPromedio < 30:
        estadoPromedio = "Bajo"
    elif 30 <= valorPromedio < 60:
        estadoPromedio = "Adecuado"
    elif 60 <= valorPromedio < 80:
        estadoPromedio = "Alto"
    else:
        estadoPromedio = "Excesivo"

    return {"estadoActual": estadoActual , "valorActual": round(valorActual, 2), "estadoPromedio": estadoPromedio, "valorPromedio": round(valorPromedio, 2)}
def stateTemperatura():
    data_sensores = pd.read_csv('../modelos/data_sensores.csv')
    valorActual = data_sensores['Temperatura'].iloc[-1]

    if valorActual < 10:
        estadoActual = "Deficiente"
    elif 10 <= valorActual < 15:
        estadoActual = "Bajo"
    elif 15 <= valorActual < 25:
        estadoActual = "Adecuado"
    elif 25 <= valorActual < 30:
        estadoActual = "Alto"
    else:
        estadoActual = "Excesivo"

    valorPromedio = data_sensores['Temperatura'].mean()
    if valorPromedio < 10:
        estadoPromedio = "Deficiente"
    elif 10 <= valorPromedio < 15:
        estadoPromedio = "Bajo"
    elif 15 <= valorPromedio < 25:
        estadoPromedio = "Adecuado"
    elif 25 <= valorPromedio < 30:
        estadoPromedio = "Alto"
    else:
        estadoPromedio = "Excesivo"

    return {"estadoActual": estadoActual , "valorActual": round(valorActual, 2), "estadoPromedio": estadoPromedio, "valorPromedio": round(valorPromedio, 2)}

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