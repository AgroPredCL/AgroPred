def obtenerAguaDisponible(aguaDisponible, requerimientoDeAguaPorPlantaPorDia, cantidadDeDias):

    
    # Dado los valores de agua agua disponible y requerimiento de agua por planta por dia,
    # se puede calcular para un rango de fechas, la cantidad de agua disponible en cada planta
    # para cada día

    response = {}

    print(aguaDisponible)
    print()
    print(requerimientoDeAguaPorPlantaPorDia)

    # Se asume que la cantidad de agua disponible es constante
    for i in range(cantidadDeDias):
        if aguaDisponible - requerimientoDeAguaPorPlantaPorDia < 0:
            response[i] = 0
        else:
            response[i] = aguaDisponible - requerimientoDeAguaPorPlantaPorDia
            aguaDisponible = aguaDisponible - requerimientoDeAguaPorPlantaPorDia

    return response
