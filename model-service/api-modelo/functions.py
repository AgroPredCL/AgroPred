from datetime import datetime, timedelta
import random



def obtenerAguaDisponible(aguaDisponible, requerimientoDeAguaPorPlantaPorDia, cantidadDeDias):
    # Dado los valores de agua disponible y requerimiento de agua por planta por día,
    # se puede calcular para un rango de fechas, la cantidad de agua disponible en cada planta
    # para cada día

    response = {}

    # Se obtiene la fecha actual y las próximas 13 fechas, en formato DD-MM-YYYY
    # Se asume que la fecha actual es el primer día
    fechaActual = datetime.now().date()
    
    # Se generan las próximas 13 fechas
    fechas = [fechaActual + timedelta(days=i) for i in range(14)]
    
    # Se formatean las fechas en formato DD-MM-YYYY
    fechasFormateadas = [fecha.strftime('%d-%m-%Y') for fecha in fechas]

    # Se asume que la cantidad de agua disponible es constante
    for i in range(cantidadDeDias):
        if aguaDisponible - requerimientoDeAguaPorPlantaPorDia < 0:
            response[fechasFormateadas[i]] = 0
        else:
            # se resta ademas un numero random entre [-5, 5]
            randomNum = random.randint(-5, 5)
            response[fechasFormateadas[i]] = max(aguaDisponible - requerimientoDeAguaPorPlantaPorDia - randomNum, 0)
            aguaDisponible = aguaDisponible - requerimientoDeAguaPorPlantaPorDia

    return response
