from datetime import timedelta, datetime
import pandas as pd
import numpy as np


# Valores de los sensores en un periodo de tiempo especifico
def stateEnPeriodoEspecifico(nombreCuartel, startDate, endDate):
    
    if nombreCuartel == "p0s1":
        data_sensores = pd.read_csv(f'../modelos/p0s0.csv')
    elif nombreCuartel == "p0s2":
        data_sensores = pd.read_csv(f'../modelos/p0s0.csv')
    else: 
        data_sensores = pd.read_csv(f'../modelos/{nombreCuartel}.csv')

    desde = 0
    hasta = 0

    for i in range(len(data_sensores)):
        if data_sensores['FechaHora'][i][:10] == startDate:
            desde = i
            break
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

    nitrogenoFinal = []
    for j in range(len(nitrogeno)):
        j = j + desde
        if nitrogeno[j] != '--':
            nitrogenoFinal.append({'fecha': fechas[j][:10], 'hora': fechas[j][11:], 'valor': round(float(nitrogeno[j]), 2)})
        else:
            nitrogenoFinal.append({'fecha': fechas[j][:10], 'hora': fechas[j][11:], 'valor': nitrogeno[j]})

    potasioFinal = []
    for j in range(len(potasio)):
        j = j + desde
        if potasio[j] != '--':
            potasioFinal.append({'fecha': fechas[j][:10], 'hora': fechas[j][11:], 'valor': round(float(potasio[j]), 2)})
        else:
            potasioFinal.append({'fecha': fechas[j][:10], 'hora': fechas[j][11:], 'valor': potasio[j]})

    fosforoFinal = []
    for j in range(len(fosforo)):
        j = j + desde
        if fosforo[j] != '--':
            fosforoFinal.append({'fecha': fechas[j][:10], 'hora': fechas[j][11:], 'valor': round(float(fosforo[j]), 2)})
        else:
            fosforoFinal.append({'fecha': fechas[j][:10], 'hora': fechas[j][11:], 'valor': fosforo[j]})
    
    humedadFinal = []
    for j in range(len(humedad)):
        j = j + desde
        if humedad[j] != '--':
            humedadFinal.append({'fecha': fechas[j][:10], 'hora': fechas[j][11:], 'valor': round(float(humedad[j]), 2)})
        else:
            humedadFinal.append({'fecha': fechas[j][:10], 'hora': fechas[j][11:], 'valor': humedad[j]})

    conductividadFinal = []
    for j in range(len(conductividad)):
        j = j + desde
        if conductividad[j] != '--':
            conductividadFinal.append({'fecha': fechas[j][:10], 'hora': fechas[j][11:], 'valor': round(float(conductividad[j]), 2)})
        else:
            conductividadFinal.append({'fecha': fechas[j][:10], 'hora': fechas[j][11:], 'valor': conductividad[j]})

    phFinal = []
    for j in range(len(ph)):
        j = j + desde
        if ph[j] != '--':
            phFinal.append({'fecha': fechas[j][:10], 'hora': fechas[j][11:], 'valor': round(float(ph[j]), 2)})
        else:
            phFinal.append({'fecha': fechas[j][:10], 'hora': fechas[j][11:], 'valor': ph[j]})

    temperaturaFinal = []
    for j in range(len(temperatura)):
        j = j + desde
        if temperatura[j] != '--':
            temperaturaFinal.append({'fecha': fechas[j][:10], 'hora': fechas[j][11:], 'valor': round(float(temperatura[j]), 2)})
        else:
            temperaturaFinal.append({'fecha': fechas[j][:10], 'hora': fechas[j][11:], 'valor': temperatura[j]})

    return nitrogenoFinal, potasioFinal, fosforoFinal, humedadFinal, conductividadFinal, phFinal, temperaturaFinal

def stateNitrogeno(nombreCuartel):

    if nombreCuartel == "p0s1":
        valorActual = 90
        valorPromedio = 90
        return {"estadoActual": "Deficiente" , "valorActual": round(valorActual, 2), "estadoPromedio": "Deficiente", "valorPromedio": round(valorPromedio, 2)}
    if nombreCuartel == "p0s2":
        valorActual = 170
        valorPromedio = 170
        return {"estadoActual": "Alto" , "valorActual": round(valorActual, 2), "estadoPromedio": "Alto", "valorPromedio": round(valorPromedio, 2)}

    data_sensores = pd.read_csv(f'../modelos/{nombreCuartel}.csv')
    valorActual = data_sensores['Nitrogeno'].iloc[-1]

    # Clasificación del valor actual de nitrógeno
    if valorActual < 20:
        estadoActual = "Deficiente"
    elif 20 <= valorActual < 30:
        estadoActual = "Bajo"
    elif 30 <= valorActual < 50:
        estadoActual = "Adecuado"
    elif 50 <= valorActual < 70:
        estadoActual = "Alto"
    else:
        estadoActual = "Excesivo"

    # Promedio del valor de nitrógeno en los datos
    valorPromedio = data_sensores['Nitrogeno'].mean()

    # Clasificación del valor promedio de nitrógeno
    if valorPromedio < 20:
        estadoPromedio = "Deficiente"
    elif 20 <= valorPromedio < 30:
        estadoPromedio = "Bajo"
    elif 30 <= valorPromedio < 50:
        estadoPromedio = "Adecuado"
    elif 50 <= valorPromedio < 70:
        estadoPromedio = "Alto"
    else:
        estadoPromedio = "Excesivo"


    return {"estadoActual": estadoActual , "valorActual": round(valorActual, 2), "estadoPromedio": estadoPromedio, "valorPromedio": round(valorPromedio, 2)}

def statePotasio(nombreCuartel):
    if nombreCuartel == "p0s1":
        valorActual = 140
        valorPromedio = 140
        return {"estadoActual": "Deficiente" , "valorActual": round(valorActual, 2), "estadoPromedio": "Deficiente", "valorPromedio": round(valorPromedio, 2)}
    if nombreCuartel == "p0s2":
        valorActual = 170
        valorPromedio = 170
        return {"estadoActual": "Alto" , "valorActual": round(valorActual, 2), "estadoPromedio": "Alto", "valorPromedio": round(valorPromedio, 2)}

    data_sensores = pd.read_csv(f'../modelos/{nombreCuartel}.csv')
    valorActual = data_sensores['Potasio'].iloc[-1]

    # Clasificación del valor actual de potasio
    if valorActual < 100:
        estadoActual = "Deficiente"
    elif 100 <= valorActual < 150:
        estadoActual = "Bajo"
    elif 150 <= valorActual < 200:
        estadoActual = "Adecuado"
    elif 200 <= valorActual < 250:
        estadoActual = "Alto"
    else:
        estadoActual = "Excesivo"

    # Promedio del valor de potasio en los datos
    valorPromedio = data_sensores['Potasio'].mean()

    # Clasificación del valor promedio de potasio
    if valorPromedio < 100:
        estadoPromedio = "Deficiente"
    elif 100 <= valorPromedio < 150:
        estadoPromedio = "Bajo"
    elif 150 <= valorPromedio < 200:
        estadoPromedio = "Adecuado"
    elif 200 <= valorPromedio < 250:
        estadoPromedio = "Alto"
    else:
        estadoPromedio = "Excesivo"

    return {"estadoActual": estadoActual , "valorActual": round(valorActual, 2), "estadoPromedio": estadoPromedio, "valorPromedio": round(valorPromedio, 2)}

def stateFosforo(nombreCuartel):
    if nombreCuartel == "p0s1":
        valorActual = 30
        valorPromedio = 30
        return {"estadoActual": "Deficiente" , "valorActual": round(valorActual, 2), "estadoPromedio": "Deficiente", "valorPromedio": round(valorPromedio, 2)}
    if nombreCuartel == "p0s2":
        valorActual = 55
        valorPromedio = 55
        return {"estadoActual": "Alto" , "valorActual": round(valorActual, 2), "estadoPromedio": "Alto", "valorPromedio": round(valorPromedio, 2)}

    data_sensores = pd.read_csv(f'../modelos/{nombreCuartel}.csv')
    valorActual = data_sensores['Fosforo'].iloc[-1]

    # Clasificación del valor actual de fósforo
    if valorActual < 10:
        estadoActual = "Deficiente"
    elif 10 <= valorActual < 15:
        estadoActual = "Bajo"
    elif 15 <= valorActual < 30:
        estadoActual = "Adecuado"
    elif 30 <= valorActual < 40:
        estadoActual = "Alto"
    else:
        estadoActual = "Excesivo"

    # Promedio del valor de fósforo en los datos
    valorPromedio = data_sensores['Fosforo'].mean()

    # Clasificación del valor promedio de fósforo
    if valorPromedio < 10:
        estadoPromedio = "Deficiente"
    elif 10 <= valorPromedio < 15:
        estadoPromedio = "Bajo"
    elif 15 <= valorPromedio < 30:
        estadoPromedio = "Adecuado"
    elif 30 <= valorPromedio < 40:
        estadoPromedio = "Alto"
    else:
        estadoPromedio = "Excesivo"


    return {"estadoActual": estadoActual , "valorActual": round(valorActual, 2), "estadoPromedio": estadoPromedio, "valorPromedio": round(valorPromedio, 2)}

def stateConductividad(nombreCuartel):
    if nombreCuartel == "p0s1":
        valorActual = 20
        valorPromedio = 20
        return {"estadoActual": "Deficiente" , "valorActual": round(valorActual, 2), "estadoPromedio": "Deficiente", "valorPromedio": round(valorPromedio, 2)}
    if nombreCuartel == "p0s2":
        valorActual = 25
        valorPromedio = 25
        return {"estadoActual": "Alto" , "valorActual": round(valorActual, 2), "estadoPromedio": "Alto", "valorPromedio": round(valorPromedio, 2)}
    
    data_sensores = pd.read_csv(f'../modelos/{nombreCuartel}.csv')
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

def statePH(nombreCuartel):
    if nombreCuartel == "p0s1":
        valorActual = 4
        valorPromedio = 4
        return {"estadoActual": "Deficiente" , "valorActual": round(valorActual, 2), "estadoPromedio": "Deficiente", "valorPromedio": round(valorPromedio, 2)}
    if nombreCuartel == "p0s2":
        valorActual = 7
        valorPromedio = 7
        return {"estadoActual": "Alto" , "valorActual": round(valorActual, 2), "estadoPromedio": "Alto", "valorPromedio": round(valorPromedio, 2)}

    data_sensores = pd.read_csv(f'../modelos/{nombreCuartel}.csv')
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

def stateHumedad(nombreCuartel):
    if nombreCuartel == "p0s1":
        valorActual = 10
        valorPromedio = 10
        return {"estadoActual": "Deficiente" , "valorActual": round(valorActual, 2), "estadoPromedio": "Deficiente", "valorPromedio": round(valorPromedio, 2)}
    if nombreCuartel == "p0s2":
        valorActual = 90
        valorPromedio = 90
        return {"estadoActual": "Alto" , "valorActual": round(valorActual, 2), "estadoPromedio": "Alto", "valorPromedio": round(valorPromedio, 2)}

    data_sensores = pd.read_csv(f'../modelos/{nombreCuartel}.csv')
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

def stateTemperatura(nombreCuartel):
    if nombreCuartel == "p0s1":
        valorActual = 5
        valorPromedio = 5
        return {"estadoActual": "Deficiente" , "valorActual": round(valorActual, 2), "estadoPromedio": "Deficiente", "valorPromedio": round(valorPromedio, 2)}
    if nombreCuartel == "p0s2":
        valorActual = 35
        valorPromedio = 35
        return {"estadoActual": "Alto" , "valorActual": round(valorActual, 2), "estadoPromedio": "Alto", "valorPromedio": round(valorPromedio, 2)}

    data_sensores = pd.read_csv(f'../modelos/{nombreCuartel}.csv')
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


def hacerRecomendacionFertilizante(nombreCuartel):

    if nombreCuartel == "p0s1":
        recomendacionNitrogeno = "Es necesario aplicar fertilizante nitrogenado"
        recomendacionPotasio = "Es necesario aplicar fertilizante potásico"
        recomendacionFosforo = "Es necesario aplicar fertilizante fosfórico"
        
    elif nombreCuartel == "p0s2":
        recomendacionNitrogeno = "No es necesario aplicar fertilizante nitrogenado"
        recomendacionPotasio = "No es necesario aplicar fertilizante potásico"
        recomendacionFosforo = "No es necesario aplicar fertilizante fosfórico"

    else:
        data_sensores = pd.read_csv(f'../modelos/{nombreCuartel}.csv')
        nitrogeno = data_sensores['Nitrogeno'].iloc[-1]
        potasio = data_sensores['Potasio'].iloc[-1]
        fosforo = data_sensores['Fosforo'].iloc[-1]

        if nitrogeno < 80:
            recomendacionNitrogeno = "Aplicar fertilizante nitrogenado"
        elif nitrogeno > 140:
            recomendacionNitrogeno = "Reducir aplicación de fertilizante nitrogenado"
        else:
            recomendacionNitrogeno = "No es necesario aplicar fertilizante nitrogenado"

        if potasio < 125:
            recomendacionPotasio = "Aplicar fertilizante potásico"
        elif potasio > 145:
            recomendacionPotasio = "Reducir aplicación de fertilizante potásico"
        else:
            recomendacionPotasio = "No es necesario aplicar fertilizante potásico"

        if fosforo < 15:
            recomendacionFosforo = "Aplicar fertilizante fosfórico"
        elif fosforo > 45:
            recomendacionFosforo = "Reducir aplicación de fertilizante fosfórico"
        else:
            recomendacionFosforo = "No es necesario aplicar fertilizante fosfórico"

    return {"nitrógeno": recomendacionNitrogeno, "potasio": recomendacionPotasio, "fósforo": recomendacionFosforo}

def alertaPorHelada_helper():

    desde, hasta, duracion, minima, promedio = "11-11-2024 05:00", "11-11-2024 06:00", 2, -0.3, -0.2

    respuesta = {
        "desde": desde,
        "hasta": hasta,
        "duracion": duracion,
        "minima": minima,
        "promedio": promedio,
    }

    return respuesta