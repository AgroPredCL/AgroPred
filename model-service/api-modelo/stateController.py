from datetime import timedelta, datetime
import pandas as pd
import numpy as np


# Valores de los sensores en un periodo de tiempo especifico
def stateEnPeriodoEspecifico(startDate, endDate):
    data_sensores = pd.read_csv('../modelos/data_sensores.csv')


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
        nitrogenoFinal.append({'fecha': fechas[j][:10], 'hora': fechas[j][11:], 'valor': round(nitrogeno[j], 2)})

    potasioFinal = []
    for j in range(len(potasio)):
        j = j + desde
        potasioFinal.append({'fecha': fechas[j][:10], 'hora': fechas[j][11:], 'valor': round(potasio[j], 2)})

    fosforoFinal = []
    for j in range(len(fosforo)):
        j = j + desde
        fosforoFinal.append({'fecha': fechas[j][:10], 'hora': fechas[j][11:], 'valor': round(fosforo[j], 2)})
    
    humedadFinal = []
    for j in range(len(humedad)):
        j = j + desde
        humedadFinal.append({'fecha': fechas[j][:10], 'hora': fechas[j][11:], 'valor': round(humedad[j], 2)})

    conductividadFinal = []
    for j in range(len(conductividad)):
        j = j + desde
        conductividadFinal.append({'fecha': fechas[j][:10], 'hora': fechas[j][11:], 'valor': round(conductividad[j], 2)})
    
    phFinal = []
    for j in range(len(ph)):
        j = j + desde
        phFinal.append({'fecha': fechas[j][:10], 'hora': fechas[j][11:], 'valor': round(ph[j], 2)})

    temperaturaFinal = []
    for j in range(len(temperatura)):
        j = j + desde
        temperaturaFinal.append({'fecha': fechas[j][:10], 'hora': fechas[j][11:], 'valor': round(temperatura[j], 2)})

    return nitrogenoFinal, potasioFinal, fosforoFinal, humedadFinal, conductividadFinal, phFinal, temperaturaFinal

def stateNitrogeno(nombreCuartel):
    data_sensores = pd.read_csv(f'../modelos/cuartel{nombreCuartel}.csv')
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
    
    print(valorActual, valorPromedio)

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


def hacerRecomendacionFertilizante():
    data_sensores = pd.read_csv('../modelos/data_sensores.csv')
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

    return {"nitrogeno": recomendacionNitrogeno, "potasio": recomendacionPotasio, "fosforo": recomendacionFosforo}